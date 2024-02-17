import "@/styles/globals.css";

import { message } from "antd";
import { Suspense } from "react";

import { MyWeb3Provider } from "@/components/web3/MyWeb3Provider";
import RenderRouter from "@/routes";

message.config({
  maxCount: 8,
});

function MyApp() {
  return (
    <MyWeb3Provider>
      <Suspense>
        <RenderRouter />
      </Suspense>
    </MyWeb3Provider>
  );
}

export default MyApp;
