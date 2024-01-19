import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/index.tsx";
import { BrowserRouter } from "react-router-dom";
import store from "./App/store/root.ts";
import { Provider } from "react-redux";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./App/theme/theme.tsx";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { GlobalStyles } from "@mui/material";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err) => {
      console.error("Error in queryCache: ", err);
    },
  }),
});

const scrollbarStyles = {
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
    borderRadius: "10px",
    height: "80%",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#8b8989",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#EA5C2B",
  },
};
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <GlobalStyles styles={scrollbarStyles} />
              <App />
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
