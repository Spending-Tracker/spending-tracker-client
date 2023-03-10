import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";

// Context
import LoaderContextProvider from "./context/LoaderContext";
import UserContextProvider from "./context/UserContext";
import ToggleDarkModeProvider from "./context/ToggleDarkMode";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToggleDarkModeProvider>
        <LoaderContextProvider>
          <UserContextProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </UserContextProvider>
        </LoaderContextProvider>
      </ToggleDarkModeProvider>
    </QueryClientProvider>
  </StrictMode>
);
