import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routerConfig } from "./RouterConfig";

const router = createBrowserRouter(routerConfig);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
