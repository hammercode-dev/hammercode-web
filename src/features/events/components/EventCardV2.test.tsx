import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EventCardV2 from "./EventCardV2";
import { TechEvent } from "../types";
import { NextIntlClientProvider } from "next-intl";

const mockData: TechEvent = {
  id: 1,
  title: "Advanced Frontend Workshop",
  description: "A deep dive into modern frontend development techniques and best practices.",
  author: "user_001",
  image_event:
    "https://static01.nyt.com/images/2021/05/02/business/00google-office1/00google-office1-videoSixteenByNineJumbo1600.jpg",
  date_event: "2024-09-15",
  status: "closed",
  duration: "3 hours",
  location: "San Francisco",
};

describe("CardEvent Component", () => {
  it("renders correctly with provided data", () => {
    render(
      <NextIntlClientProvider timeZone="Europe/London" locale="en" messages={{}}>
        <EventCardV2 data={mockData} />
      </NextIntlClientProvider>
    );

    expect(screen.getByAltText("Advanced Frontend Workshop")).toBeInTheDocument();
    expect(screen.getByText("Advanced Frontend Workshop")).toBeInTheDocument();
    expect(screen.getByText("closed")).toBeInTheDocument();
    expect(screen.getByText("September 15, 2024")).toBeInTheDocument();
    expect(screen.getByText("3 hours")).toBeInTheDocument();
    expect(screen.getByText("San Francisco")).toBeInTheDocument();
  });
});
