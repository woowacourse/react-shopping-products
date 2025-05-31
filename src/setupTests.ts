import { node } from "./mocks/node";
import "@testing-library/jest-dom";

beforeAll(() => node.listen());

afterEach(() => node.resetHandlers());

afterAll(() => node.close());
