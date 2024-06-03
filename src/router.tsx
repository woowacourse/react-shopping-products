import ProductListPage from "@/pages/productListPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
    ],
  },
]);

export default router;
