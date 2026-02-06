import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Floor from "./pages/Floor.jsx";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/floor/1" replace /> },
  { path: "/floor/:id", element: <Floor /> },
  { path: "*", element: <div style={{ padding: 24 }}>404</div> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
