import { PATH } from "@/constants/path";
import ErrorWrapperPage from "@/pages/productListPage/errorWrapper";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: PATH.ROOT,
    children: [
      {
        index: true,
        element: <ErrorWrapperPage />,
      },
    ],
  },
]);

export default router;
