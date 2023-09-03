import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import Detail from "./pages/Detail"
import Home from "./pages/Home"
import List from "./pages/List"

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "detail",
        Component: Detail,
      },
      {
        path: "list",
        Component: List,
      },
      {
        index: true,
        Component: Home,
      },
      {
        path: "*",
        Component: Home,
      },
    ],
  },
])

export default router
