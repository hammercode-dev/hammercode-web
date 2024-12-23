import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import Navbar from ".";

const messages = {
  Layout: {
    navbar: {
      "link-1": "About Us",
      "link-2": "Events",
      "link-3": "Donate",
    },
  },
  Announcement: {
    "pdd-2024": "🚀 Hi there!...",
  },
};

vi.mock("@/lib/navigation", () => ({
  usePathname: vi.fn(),
  useRouter: vi.fn(),
  Link: vi.fn(),
}));

describe("Navbar", () => {
  it("renders path link correctly", () => {
    render(
      <NextIntlClientProvider timeZone="Europe/London" locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });

  it("renders the announcement correctly", () => {
    render(
      <NextIntlClientProvider timeZone="Europe/London" locale="en" messages={messages}>
        <Navbar />
      </NextIntlClientProvider>
    );

    const annnouncement = screen.getByRole("heading", { level: 2 });
    expect(annnouncement).toHaveTextContent("Hi there!...");
  });
});
