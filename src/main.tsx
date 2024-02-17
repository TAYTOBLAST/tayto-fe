import { App as AntdApp, ConfigProvider } from "antd";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const container: any = document.getElementById("root");

const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ConfigProvider theme={{ hashed: false }}>
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>
  </BrowserRouter>
);
