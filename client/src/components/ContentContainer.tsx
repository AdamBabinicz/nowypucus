import React, { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
}

const ContentContainer = ({ children, className }: ContentContainerProps) => {
  return (
    <div
      className={`max-w-screen-xl mx-auto px-4 lg:px-[6rem] w-full ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default ContentContainer;
