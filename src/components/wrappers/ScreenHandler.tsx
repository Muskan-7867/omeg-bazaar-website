import React from "react";

const ScreenHandler = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-[1920px] mx-auto">{children}</div>;
};

export default ScreenHandler;
