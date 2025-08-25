import { Request, Response } from "express";
import { DBModule } from "blazend/dist/modules/db";
import nodemailer from "nodemailer";
import { cond } from "blazend";
import { nanoid } from "nanoid";
import otpGenerator from "otp-generator";
import { addDays, addMinutes } from "date-fns";
import { appEnv } from "./config";
import DeviceDetector from "node-device-detector";
import ClientHints from "node-device-detector/client-hints";
import db from "./db";

const deviceDetector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
});

export const handleHealthcheck = (_: Request, res: Response) => {
  res.status(200).json({});
}

const sendEmail = async (
  db: DBModule,
  recipientString: string,
  subject?: string,
  body?: string,
  bodyType: "text" | "html" = "text",
): Promise<void> => {
  const emailSettings: any = (await db.get("settings").withSchema("public").where(cond("id", "==", "EMAIL")).apply())?.[0]?.details;
  if (!emailSettings) {
    throw new Error("Email settings not configured");
  }

  if (!body) {
    throw new Error("Body is required to send email");
  }

  if (!recipientString) {
    throw new Error("Recipient not specified");
  }

  const recipients = recipientString?.toLowerCase().split(",");
  const sender = emailSettings.email;
  const auth = {
    user: sender,
    pass: emailSettings.password,
  }
  const transporter = nodemailer.createTransport({
    host: emailSettings.host,
    port: emailSettings.port ?? 465,
    secure: emailSettings.secure ?? true,
    auth,
    socketTimeout: 8 * 60 * 60 * 1000,
    greetingTimeout: 1000 * 15,
  });

  for (const recipient of recipients) {
    await transporter.sendMail({
      from: sender,
      to: recipient,
      subject: subject,
      text: bodyType === "text" ? body : undefined,
      html: bodyType === "html" ? body : undefined,
    });
  }
}

function checkIfEmailIsValid(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

enum OtpReason {
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
  LOGIN = "LOGIN",
}

const sendOtp = async (
  db: DBModule,
  reqId: string,
  recipient: string,
  reason: string,
  data: any,
) => {
  const otpGenerationOptions = {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  };

  const otp = otpGenerator.generate(6, otpGenerationOptions);

  if (appEnv === "development") {
    console.log("otp", otp);
  } else {
    let subject = "";
    let html = "";
    switch (reason) {
      case OtpReason.EMAIL_VERIFICATION: {
        subject = "Email Verification";
        html = `<p>OTP for verifying your email is <b>${otp}</b></p>`;
        break;
      }
      case OtpReason.LOGIN: {
        subject = "Login OTP";
        html = `<p>OTP for login is <b>${otp}</b></p>`;
        break;
      }
    }
    await sendEmail(db, recipient, subject, html, "html");
  }

  const expiresAt = addMinutes(new Date(), 5).toISOString();

  const otpDbRecord = {
    req_id: reqId,
    otp,
    recipient,
    reason,
    expires_at: expiresAt,
    data,
  };

  await db.insert("otps").withSchema("public").doc(otpDbRecord).apply();
};

const deleteExpiredOtps = async (db: DBModule): Promise<void> => {
  const currentTime = new Date().toISOString();
  return db.delete("otps").withSchema("public").where(cond("expires_at", "<=", currentTime)).apply();
};

export const handleGetEmailVerificationOtp = async (req: Request, res: Response) => {
  const email = (<string>req.body.email).trim().toLowerCase();
  if (!email) {
    throw new Error("Email not specified");
  }

  const verificationDetails = (await db.get("verified_emails").withSchema("public").where(cond("email", "==", email)).apply())?.[0];
  if (verificationDetails) {
    res.status(200).json({ alreadyVerified: true, verifiedAt: verificationDetails.verified_at });
    return;
  }

  const isValidEmail = checkIfEmailIsValid(email);
  if (!isValidEmail) {
    throw new Error("Email is invalid");
  }

  const reqId = <string>req.body.reqId || nanoid();

  await deleteExpiredOtps(db);

  const [oldOtpRequest]: any[] = await db.get("otps").withSchema("public").where(cond("req_id", "==", reqId)).apply();
  if (oldOtpRequest) {
    const timeSinceOldOtpInSeconds = (new Date().getTime() - new Date(oldOtpRequest.created_at).getTime()) / 1000;
    if (timeSinceOldOtpInSeconds < 60) {
      throw new Error("Please wait some time before requesting for new OTP")
    }
    await db.delete("otps").withSchema("public").where(cond("req_id", "==", reqId)).apply();
  }

  await sendOtp(db, reqId, email, OtpReason.EMAIL_VERIFICATION, { email });
  res.status(200).json({ reqId });
}

export const handleVerifyEmailVerificationOtp = async (db: DBModule, req: Request, res: Response) => {
  const reqId = <string>req.body.reqId;
  const otp = <string>req.body.otp;
  if (!reqId || !otp) {
    throw new Error("Bad request");
  }

  await deleteExpiredOtps(db);

  const [otpRequest]: any[] = await db.get("otps").withSchema("public").where(cond("req_id", "==", reqId)).apply();
  if (!otpRequest || otpRequest.otp !== otp) {
    throw new Error("Expired or invalid OTP")
  }
  const email = otpRequest.data.email;
  await db.insert("verified_emails").withSchema("public").doc({ email }).apply();
  res.status(200).json({});
}

const deleteExpiredSessions = async (db: DBModule): Promise<void> => {
  const currentTime = new Date().toISOString();
  return db.delete("sessions").withSchema("public").where(cond("expires_at", "<=", currentTime)).apply();
};

export const handleSignup = async (db: DBModule, req: Request, res: Response) => {
  const data = req.body.data;
  if (!data.email || !data.first_name || !data.middle_name || !data.last_name || !data.gender || !data.dob) {
    throw new Error("Bad request");
  }
  const isEmailVerified = (<any[]>await db.get("verified_emails").withSchema("public").where(cond("email", "==", data.email)).apply()).length === 1;
  if (!isEmailVerified) {
    throw new Error("Please verify your email to complete the signup process");
  }

  const memberId = nanoid();
  const member = { id: memberId, ...data };
  await db.insert("members").withSchema("public").doc(member).apply();

  const sessionId = nanoid();
  const d = new Date();
  const createdAt = d.toISOString();
  const expiresAt = addDays(d, 30).toISOString();
  const clientHints = new ClientHints();
  const userAgent = req.headers["user-agent"] || "";
  const clientHintData = clientHints.parse(req.headers, {});
  const device = deviceDetector.detect(userAgent, clientHintData);
  const sessionDbRecord = {
    id: sessionId,
    member_id: member.id,
    created_at: createdAt,
    expires_at: expiresAt,
    device,
  };

  await deleteExpiredSessions(db);
  await db.insert("sessions").withSchema("public").doc(sessionDbRecord).apply();
  const response = {
    sessionId,
    expiresAt,
    profile: member,
  }
  res.status(200).json(response);
}

export const handleGetLoginOtp = async (db: DBModule, req: Request, res: Response) => {
  const email = (<string>req.body.email).trim().toLowerCase();
  if (!email) {
    throw new Error("Bad request");
  }

  const memberExists = (<any[]>await db.get("members").where(cond("email", "==", email)).apply()).length === 1;
  if (!memberExists) {
    throw new Error("Email not found. Please register the member with the specified email");
  }

  const reqId = req.body.reqId || nanoid();
  const [oldOtpRequest]: any[] = await db.get("otps").withSchema("public").where(cond("req_id", "==", reqId)).apply();
  if (oldOtpRequest) {
    const timeSinceOldOtpInSeconds = (new Date().getTime() - new Date(oldOtpRequest.created_at).getTime()) / 1000;
    if (timeSinceOldOtpInSeconds < 60) {
      throw new Error("Please wait some time before requesting for new OTP")
    }
    await db.delete("otps").withSchema("public").where(cond("req_id", "==", reqId)).apply();
  }
  await sendOtp(db, reqId, email, OtpReason.LOGIN, { email });
  res.status(200).json({ reqId });
}

export const handleVerifyLoginOtp = async (db: DBModule, req: Request, res: Response) => {
  const reqId = <string>req.body.reqId;
  const otp = <string>req.body.otp;
  if (!reqId || !otp) {
    throw new Error("Bad request");
  }

  await deleteExpiredOtps(db);

  const [otpRequest]: any[] = await db.get("otps").withSchema("public").where(cond("req_id", "==", reqId)).apply();
  if (!otpRequest || otpRequest.otp !== otp) {
    throw new Error("Expired or invalid OTP")
  }
  const email = otpRequest.data.email;
  const [member]: any[] = await db.get("members").withSchema("public").where(cond("email", "==", email)).apply();

  const sessionId = nanoid();
  const d = new Date();
  const createdAt = d.toISOString();
  const expiresAt = addDays(d, 30).toISOString();
  const clientHints = new ClientHints();
  const userAgent = req.headers["user-agent"] || "";
  const clientHintData = clientHints.parse(req.headers, {});
  const device = deviceDetector.detect(userAgent, clientHintData);
  const sessionDbRecord = {
    id: sessionId,
    member_id: member.id,
    created_at: createdAt,
    expires_at: expiresAt,
    device,
  };

  await deleteExpiredSessions(db);
  await db.insert("sessions").withSchema("public").doc(sessionDbRecord).apply();
  const response = {
    sessionId,
    expiresAt,
    profile: member,
  }
  res.status(200).json(response);
}