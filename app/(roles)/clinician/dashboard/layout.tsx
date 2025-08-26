import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="custom-container py-6">
      {children}
    </div>
  );
};

export default Layout;
