// import { useState } from "react";

// const useLoading = () => {
//   const [isLoading, setIsLoading] = useState(false);

//   const withLoading = async (asyncCallback: () => Promise<void>) => {
//     setIsLoading(true);
//     try {
//       await asyncCallback();
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { isLoading, withLoading };
// };

// export default useLoading;

import { useState } from "react";

const useLoading = () => {
  const [isLoading, setIsLoading] = useState(false);

  const withLoading = async <T>(
    asyncCallback: () => Promise<T>
  ): Promise<T> => {
    setIsLoading(true);
    try {
      return await asyncCallback();
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, withLoading };
};

export default useLoading;
