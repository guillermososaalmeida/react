import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

/**
 * @vitest-environment jsdom
 */

describe("App", () => {
  test("should render the correct elements", () => {
    render(<App />);

    expect(screen.getByAltText("giphy")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type your name!")).toBeInTheDocument();
    expect(screen.getByText("Hello,")).toBeInTheDocument();
  });

  test("should render the correct name when the user filled", () => {
    render(<App />);

    const inputElement = screen.getByPlaceholderText("Type your name!");
    expect(screen.queryByText("Hello,")).toBeInTheDocument();

    userEvent.type(inputElement, "Alberto");

    waitFor(() =>
      expect(screen.queryByText("Hello, Alberto")).toBeInTheDocument(),
    );
  });
});
