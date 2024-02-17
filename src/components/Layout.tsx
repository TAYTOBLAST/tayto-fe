import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/Footer";
import Header from "@/components/Header";

export interface LayoutProps {
  className?: string;
  children: React.ReactNode;
}

const Layout = () => {
  return (
    <div>
      <Header />
      <Suspense>
        <Outlet />
      </Suspense>
      {/*<Footer />*/}
    </div>
  );
};

export default Layout;
