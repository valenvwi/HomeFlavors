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

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
        </BrowserRouter>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
