import { Spin } from "antd";
import { useState, useEffect } from "react";

export default function Loader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // small delay to trigger transition
    const timer = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 
        transition-opacity duration-500 
        ${show ? "opacity-100 bg-black/0" : "opacity-0 bg-black/0"}`}
    >
      <Spin size="large" tip="Loading..." className="custom-spin" />
    </div>
  );
}
