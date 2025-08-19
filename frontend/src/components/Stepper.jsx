import React, { useState } from "react";
import { Button, PageOne, PageTwo } from "./index";
import { message, Steps } from "antd";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Stepper() {
  const methods = useForm({ mode: "onChange" });
  const { trigger, handleSubmit } = methods;
  const steps = [
    {
      title: "Personal Details",
      content: <PageOne />,
    },
    {
      title: "Education & Professional Details",
      content: <PageTwo />,
    },
  ];
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  /**
   * Moves to the next step in the stepper
   */
  const next = async () => {
    if (current === 0) {
      const valid = await trigger(); // This will now work!
      if (!valid) return;
    }
    setCurrent(current + 1);
  };
  /**
   * Moves to the previous step in the stepper
   */

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <FormProvider {...methods}>
      <div>
        <div>
          <Steps current={current} items={items} />
        </div>
        <div className="mt-4">{steps[current].content}</div>
        <div className="flex justify-between items-center mt-5">
          <p className="text-sm">
            Already registered?{" "}
            <span
              className="text-red-500 font-bold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login here
            </span>
          </p>

          <div className="flex">
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                Previous
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleSubmit(() => {
                  message.success("Processing complete!");
                  setTimeout(() => {
                    navigate("/"); // Redirect after message shows
                  }, 1000);
                  console.log("Form submitted successfully");
                })}
              >
                Done
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
