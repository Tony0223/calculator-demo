import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./index";

jest.mock("../proto/calculator/v1/calculator_connect", () => {
  return {
    CalculatorService: {},
  };
});

jest.mock("@connectrpc/connect-web", () => ({
  createConnectTransport: () => ({}),
}));

jest.mock("@connectrpc/connect", () => ({
  createPromiseClient: () => ({
    calculate: jest.fn(({ a, b, operator }) => {
      let result = 0;
      let message = "OK";
      switch (operator) {
        case "+":
          result = a + b;
          break;
        case "-":
          result = a - b;
          break;
        case "*":
          result = a * b;
          break;
        case "/":
          if (b === 0) {
            message = "Cannot divide by zero.";
          } else {
            result = a / b;
          }
          break;
        default:
          message = "Invalid operator.";
      }
      return Promise.resolve({ result, message });
    }),
  }),
}));

describe("Calculator UI", () => {
  test("performs addition", async () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText("A"), { target: { value: "3" } });
    fireEvent.change(screen.getByPlaceholderText("B"), { target: { value: "4" } });
    fireEvent.change(screen.getByDisplayValue("+"), { target: { value: "+" } });
    fireEvent.click(screen.getByText("Calculate"));

    const resultDiv = await screen.findByText(/Result:/);
    expect(resultDiv).toHaveTextContent("7 (OK)");
  });

  test("handles divide by zero", async () => {
    render(<Home />);
    fireEvent.change(screen.getByPlaceholderText("A"), { target: { value: "3" } });
    fireEvent.change(screen.getByPlaceholderText("B"), { target: { value: "0" } });
    fireEvent.change(screen.getByDisplayValue("+"), { target: { value: "/" } });
    fireEvent.click(screen.getByText("Calculate"));

    const resultDiv = await screen.findByText(/Result:/);
    expect(resultDiv).toHaveTextContent("0 (Cannot divide by zero.)");
  });
});
