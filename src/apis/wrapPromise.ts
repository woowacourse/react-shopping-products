type Status = "pending" | "success" | "error";

export function wrapPromise<T>(promise: Promise<T>) {
  let status: Status = "pending";
  let response: T;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default: // success
        return response;
    }
  };

  return { read };
}
