import { describe, test, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Footer, { socialLogos } from "./Footer";

/**
 * @vitest-environment jsdom
 */

describe("Footer", () => {
  test("should render the correct elements", () => {
    render(<Footer />);
    expect(
      screen.getByText("Created with love by @RiveraMerida"),
    ).toBeInTheDocument();
  });

  test("Social logos should be appear", () => {
    render(<Footer />);
    waitFor(() =>
      socialLogos.forEach((logo) => {
        expect(screen.getByAltText(`logo ${logo.alt}`)).toBeVisible();
      }),
    );
  });
});
