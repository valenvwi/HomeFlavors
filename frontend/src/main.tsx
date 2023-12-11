import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/index.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./App/store/root.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
