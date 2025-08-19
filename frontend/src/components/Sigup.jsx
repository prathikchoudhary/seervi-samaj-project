import { Logo, Stepper, Image, Slider, Loader } from "./index";
import { useState, useEffect } from "react";

export default function Signup() {
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
          {/* Left: Signup form */}
          <div className="w-full lg:ml-40 lg:w-1/2 text-sm">
            <h2 className="text-2xl md:text-3xl font-bold">
              Sign <span className="text-rose-500">Up</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Enter your details below to get started.
            </p>
            <div className="mt-3">
              <Stepper />
            </div>
          </div>

          {/* Right: Image/card */}
          <div className="hidden lg:flex w-1/2 justify-center mr-10">
            <div className="w-full sm:w-[80%] md:w-[70%] lg:w-md rounded-md shadow-lg shadow-gray-300/60 bg-white flex p-4 flex-col justify-center items-center text-center h-[400px] md:h-[500px]">
              <div>
                <Slider />
              </div>
              <div className="mt-3 text-sm text-gray-400 overflow-y-auto">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut,
                  libero dicta necessitatibus consectetur voluptatem sit harum ad
                  beatae voluptatum. Minima harum error eveniet deserunt in, vel
                  earum beatae illum ratione?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
