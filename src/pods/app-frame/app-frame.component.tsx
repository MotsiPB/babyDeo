import React from "react";
import { Nav } from "./nav.component";
import { Footer } from "./footer.component";

export const AppFrame: React.FC = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};
