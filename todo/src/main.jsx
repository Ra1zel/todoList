import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TodoListContextProvider from "../context/todoListContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TodoListContextProvider>
    <App />
  </TodoListContextProvider>
);
