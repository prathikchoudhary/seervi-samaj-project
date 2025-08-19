import { Logo, Input, Image, Slider, Loader } from "./index";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Login() {
  const navigate = useNavigate();
  const methods = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(true);

  // simulate loading for demo
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <div className="w-screen min-h-screen flex flex-col px-4 md:px-6 lg:px-0">
        {/* Background Image */}
        <div className="hidden lg:block absolute top-0 left-0 right-0 w-full pointer-events-none z-0">
          <Image />
        </div>

        {/* Logo */}
        <div className="flex justify-center mt-4">
          <Logo className="h-15" />
        </div>

        {/* Main content row */}
        <div className="flex flex-col lg:flex-row mt-7 flex-1 gap-6">
          {/* Left: Login form */}
          <div className="w-full lg:ml-40 lg:w-1/2 text-sm mx-auto max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold">
              Log <span className="text-rose-500">in</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Welcome back! Please enter your details to continue.
            </p>
            <div className="mt-3">
              <FormProvider {...methods}>
                <div>
                  <Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    }}
                    error={methods.formState.errors.email?.message}
                  />
                  <Input
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    error={methods.formState.errors.password}
                  />
                  <button
                    type="submit"
                    onClick={methods.handleSubmit((data) => {
                      console.log(data);
                      navigate("/"); // Redirect to dashboard on successful login
                    })}
                    className="w-full mt-4 bg-red-500 text-white py-2 rounded-md hover:bg-red-700 transition-colors"
                  >
                    Log In
                  </button>
                  <button
                    type="button"
                    className="w-full mt-3 flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <img
                      src="https://www.svgrepo.com/show/355037/google.svg"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700">Continue with Google</span>
                  </button>
                  <p className="text-center mt-3">
                    Not registered yet?{" "}
                    <span
                      className="text-red-500 font-bold cursor-pointer hover:underline"
                      onClick={() => navigate("/signup")}
                    >
                      Signup here
                    </span>
                  </p>
                </div>
              </FormProvider>
            </div>
          </div>

          {/* Right: Fixed-height image/card (desktop only) */}
          <div className="hidden lg:flex w-1/2 justify-center lg:mr-10">
            <div className="w-full sm:w-[80%] md:w-[70%] lg:w-md rounded-md shadow-lg shadow-gray-300/60 bg-white flex p-4 flex-col justify-center items-center text-center h-[400px] md:h-[500px]">
              <div>
                <Slider />
              </div>
              <div className="mt-3 text-sm text-gray-400 overflow-y-auto">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  libero dicta necessitatibus consectetur voluptatem sit harum
                  ad beatae voluptatum. Minima harum error eveniet deserunt in,
                  vel earum beatae illum ratione?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
