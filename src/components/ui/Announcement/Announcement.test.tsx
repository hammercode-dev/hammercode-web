import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Announcement from "./";
import userEvent from "@testing-library/user-event";

describe("Announcement", () => {
  it("renders correctly", async () => {
    const message = "An event is happening!";

    const { getByRole, queryByRole } = render(<Announcement message={message} />);

    expect(getByRole("alert")).toHaveTextContent("An event is happening!");

    await userEvent.click(getByRole("button"));

    expect(queryByRole("alert")).not.toBeInTheDocument();
  });

  it("renders clickable link", async () => {
    const message = "An event is happening!";
    const link = "https://event.com/awesome-event";

    const { getByRole } = render(<Announcement message={message} url={link} />);

    expect(getByRole("link")).toHaveTextContent("An event is happening!");
    expect(getByRole("link")).toHaveAttribute("href", link);
  });
});
