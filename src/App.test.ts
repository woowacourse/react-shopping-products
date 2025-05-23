import { render, waitFor } from "@testing-library/react";
import { server } from "./mocks/server";

server.listen();

test("App", async () => {
  const response = await fetch("http://localhost:3000/products");
  const user = await response.json();

  await waitFor(() => {
    expect(user[0].name).toEqual("Apple");
  });
});
