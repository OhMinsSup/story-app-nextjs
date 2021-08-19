import React from "react";
import Navbar from "@components/ui/Navbar";
import { css } from "@emotion/react";

interface AppLayoutProps {}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main
        className="bg-white"
        css={css`
        flex: 1 0 auto;
      `}
      >
        <div className="container-fluid">
          filter area
        </div>
        <div>
          {children}
        </div>
      </main>
    </>
  );
};

export default AppLayout;
