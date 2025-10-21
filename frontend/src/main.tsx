import React from "react"
import ReactDOM from "react-dom/client"
import { ContextProvider } from "./context"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider />
  </React.StrictMode>,
)