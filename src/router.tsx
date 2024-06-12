import { PATH } from "@/constants/path";
import ProductListPage from "@/pages/productListPage";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
    ],
  },
]);

export default router;
