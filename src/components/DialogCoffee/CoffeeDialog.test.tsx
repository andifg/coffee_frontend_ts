import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import CoffeeDialog from "./CoffeeDialog";
import { describe, it, expect, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";

describe("CoffeeDialog", () => {
  vi.mock("heic2any", () => ({
    default: vi.fn(),
  }));

  const mockProps = {
    open: true,
    handleCancel: vi.fn(),
    handleSubmit: vi.fn(),
    setError: vi.fn(),
    imageURL: "mockImageURL",
    error: "mockError",
    coffeeName: "mockCoffeeName",
    loading: false,
    setLoading: vi.fn(),
    title: "Mock Title",
  };

  it("renders without crashing", () => {
    render(<CoffeeDialog {...mockProps} />);
    expect(screen.getByText("Mock Title")).toBeInTheDocument();
    expect(screen.getAllByDisplayValue("mockCoffeeName")).toHaveLength(1);
  });

  it("Test cancle button", () => {
    render(<CoffeeDialog {...mockProps} />);

    expect(screen.getByText("Cancel")).toBeInTheDocument();
    const cancle = screen.getByText("Cancel");
    fireEvent.click(cancle);
    expect(mockProps.handleCancel).toHaveBeenCalled();
  });

  it("Test submit button", () => {
    const fileMock = new File(["file content"], "file.txt", {
      type: "text/plain",
    });

    vi.spyOn(React, "useState")
      .mockImplementationOnce(() => ["imageURLMock", () => null])
      .mockImplementationOnce(() => ["mockCoffeeName", () => null])
      .mockImplementation(() => [fileMock, vi.fn()]);

    render(<CoffeeDialog {...mockProps} />);

    expect(screen.getByText("Send")).toBeInTheDocument();

    const submit = screen.getByText("Send");

    fireEvent.click(submit);

    expect(mockProps.handleSubmit).toHaveBeenCalledWith(
      "mockCoffeeName",
      fileMock,
    );
  });

  it("Test file and name change", async () => {
    const setCoffeeImageMock = vi.fn();
    const setCoffeeImageURLMock = vi.fn();
    const setCoffeeNameMock = vi.fn();

    vi.spyOn(React, "useState")
      .mockImplementationOnce(() => [undefined, setCoffeeImageURLMock])
      .mockImplementationOnce(() => ["", setCoffeeNameMock])
      .mockImplementation(() => [undefined, setCoffeeImageMock]);

    vi.mock("../utils/FileReader", () => ({
      createDataURL: vi
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => resolve("mockDataURL")),
        ),
    }));

    render(<CoffeeDialog {...mockProps} />);

    expect(screen.getByText("Send")).toBeInTheDocument();

    const submit = screen.getByText("Send");

    fireEvent.click(submit);

    const file = new File(["file content"], "file.txt", { type: "text/plain" });

    const inputFile: HTMLInputElement = screen.getByTestId("upload-file");

    await userEvent.upload(inputFile, file);

    const textinput: HTMLInputElement = screen.getByTestId("coffee-name-input");

    await userEvent.type(textinput, "newCoffeeName");

    expect(setCoffeeNameMock).toHaveBeenCalledWith("mockCoffeeName");
    expect(setCoffeeImageMock).toHaveBeenCalledWith(file);
    expect(setCoffeeImageURLMock).toHaveBeenCalledWith("mockDataURL");
  });

  it("Test add new coffee scenario with emtpy props", () => {
    const undefinedMockProps = {
      open: true,
      handleCancel: vi.fn(),
      handleSubmit: vi.fn(),
      setError: vi.fn(),
      imageURL: undefined,
      error: undefined,
      coffeeName: undefined,
      loading: false,
      setLoading: vi.fn(),
      title: "Mock Title",
    };

    render(<CoffeeDialog {...undefinedMockProps} />);

    const textinput: HTMLInputElement = screen.getByTestId("coffee-name-input");

    expect(textinput.value).toEqual("");

    expect(screen.getByText("Mock Title")).toBeInTheDocument();
  });
});
