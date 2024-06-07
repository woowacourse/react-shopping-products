import { createContext } from 'react';
import { useFetchAddCart } from './hooks/index';
// import { MutateOptions } from '@tanstack/react-query';

export const CartContext = createContext<ReturnType<typeof useFetchAddCart>>({
  addCartItem: () => {},
  // isPending: false,
  // isError: false,
  // data: undefined,
  // variables: undefined,
  // error: null,
  // isError: false,
  // isIdle: false,
  // isPending: false,
  // isSuccess: false,
  // status: 'error',
  // reset: function (): void {
  //   throw new Error('Function not implemented.');
  // },
  // context: undefined,
  // failureCount: 0,
  // failureReason: null,
  // isPaused: false,
  // submittedAt: 0,
  // mutateAsync: function (
  //   variables: number,
  //   options?: MutateOptions<void, Error, number, void> | undefined,
  // ): Promise<void> {
  //   throw new Error('Function not implemented.');
  // },
});
