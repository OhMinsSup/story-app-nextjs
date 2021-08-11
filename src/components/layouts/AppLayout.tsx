import React, { useEffect } from "react";
// import Caver from "caver-js";
import Navbar from "@components/ui/Navbar";
import KaytonIcon from "@components/Icon/klaytnIcon";

// const caver = new Caver("https://api.baobab.klaytn.net:8651/");

interface AppLayoutProps {}
const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  useEffect(() => {
  }, []);
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
