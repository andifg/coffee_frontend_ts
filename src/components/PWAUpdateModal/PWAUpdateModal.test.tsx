import { render, screen } from "@testing-library/react";
import { PWAUpdateModal } from "./PWAUpdateModal";
import { describe, it, expect, vi } from "vitest";
import { useRegisterSW } from "virtual:pwa-register/react";
import userEvent from "@testing-library/user-event";

vi.mock("virtual:pwa-register/react", () => ({
  useRegisterSW: vi.fn(),
}));

const needRefreshMock = vi.fn();
const updateServiceWorkerMock = vi.fn();

vi.mocked(useRegisterSW).mockReturnValue({
  offlineReady: [true, vi.fn()],
  needRefresh: [true, needRefreshMock],
  updateServiceWorker: updateServiceWorkerMock,
});

describe("AppUpdateModal", () => {
  it("renders modal when needRefresh is true", async () => {
    render(<PWAUpdateModal />);

    // Check if the modal is rendered
    expect(screen.getByText("New App version available!")).toBeInTheDocument();
    expect(screen.getByText("Do you want to update now?")).toBeInTheDocument();
  });

  it("calls close function when Cancel button is clicked", async () => {
    render(<PWAUpdateModal />);

    await userEvent.click(screen.getByText("Cancel"));

    expect(needRefreshMock).toHaveBeenCalledWith(false);
  });

  it("calls updateServiceWorker function when Update button is clicked", async () => {
    render(<PWAUpdateModal />);

    await userEvent.click(screen.getByText("Update"));

    // Check if the updateServiceWorker function is called
    expect(updateServiceWorkerMock).toHaveBeenCalledWith(true);
  });
});
