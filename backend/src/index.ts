import express, { Request, Response } from "express";
import * as handlers from "./handlers";

const app = express();
app.use(express.json());

// handlers
app.get("/healthcheck", handlers.handleHealthcheck);
app.post("/getEmailVerificationOtp", handlers.handleGetEmailVerificationOtp);
app.post("/verifyEmailVerificationOtp", handlers.handleVerifyEmailVerificationOtp);
app.post("/getSignup", handlers.handleSignup);
app.post("/getLoginOtp", handlers.handleGetLoginOtp);
app.post("/verifyLoginOtp", handlers.handleVerifyLoginOtp);

// start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});