import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import BottomNavigator from "./BottomNavigator";
import { it, expect } from "vitest";
import { userEvent } from "@testing-library/user-event";

it("renders Feed and Home links", () => {
  render(
    <BrowserRouter>
      <BottomNavigator />
    </BrowserRouter>,
  );

  // Check if Feed and Home links are rendered
  expect(screen.getByText("Feed")).toBeInTheDocument();
  expect(screen.getByText("Home")).toBeInTheDocument();
});

it("navigates to /feed when Feed link is clicked", async () => {
  render(
    <BrowserRouter>
      <BottomNavigator />
    </BrowserRouter>,
  );

  await userEvent.click(screen.getByText("Feed"));

  // Check if the location has changed to /feed
  expect(window.location.pathname).toBe("/feed");
});

it("navigates to /home when Home link is clicked", async () => {
  render(
    <BrowserRouter>
      <BottomNavigator />
    </BrowserRouter>,
  );

  await userEvent.click(screen.getByText("Home"));

  // Check if the location has changed to /home
  expect(window.location.pathname).toBe("/home");
});
