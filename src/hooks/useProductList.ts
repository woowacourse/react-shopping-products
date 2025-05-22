import { useEffect, useReducer, useState } from "react";

import fetchProductList from "../apis/product/fetchProductList";

import { useErrorMessageContext } from "../context/ErrorMessageContext";

import { ProductCategory } from "../types/ProductCategory";
import { Sort } from "../types/Sort";
import { Product } from "../types/Product";

const INIT_STATE = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
};

const ACTION_TYPE = {
  FETCH_LOADING: "FETCH_LOADING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",
};

const reducer = (state: typeof INIT_STATE, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_LOADING:
      return { isLoading: true, isSuccess: false, isFail: false };
    case ACTION_TYPE.FETCH_SUCCESS:
      return { isLoading: false, isSuccess: true, isFail: false };
    case ACTION_TYPE.FETCH_FAIL:
      return { isLoading: false, isSuccess: false, isFail: true };
    default:
      return state;
  }
};

interface useProductListProps {
  category: ProductCategory;
  sort: Sort;
}

interface useProductListReturn {
  state: typeof INIT_STATE;
  productList: Product[];
}

const useProductList = ({
  category,
  sort,
}: useProductListProps): useProductListReturn => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [productList, setProductList] = useState([]);
  const { handleErrorMessage } = useErrorMessageContext();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: ACTION_TYPE.FETCH_LOADING });
      try {
        const { content } = await fetchProductList({
          method: "GET",
          params: {
            category,
            sort,
            page: "0",
            size: "20",
          },
        });
        setProductList(content);
        dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
      } catch (error) {
        handleErrorMessage("상품 목록을 불러오는데 실패했습니다.");
        dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      }
    };
    fetchData();
  }, [category, sort]);

  return { state, productList };
};

export default useProductList;
