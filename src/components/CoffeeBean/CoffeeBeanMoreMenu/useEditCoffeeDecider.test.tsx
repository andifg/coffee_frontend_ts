import { describe, it, expect } from "vitest";
import configureStore from "redux-mock-store";
import { renderHook } from "@testing-library/react";
import useEditCoffeeDecider from "./useEditCoffeeDecider";
import { Provider } from "react-redux";
import { ReactNode } from "react";

describe("useEditCoffeeDecider", () => {
  const initialState = {
    user: {
      userName: "test-user-name",
      userRole: "Admin",
      owner_id: "test-owner-id",
    },
  };

  const mockStore = configureStore();

  const store = mockStore(initialState);

  const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  it("should return true if user is admin", async () => {
    const { result } = renderHook(
      () =>
        useEditCoffeeDecider({
          coffee: {
            _id: "test-id",
            name: "test-name",
            roasting_company: "test-roasting-company",
            owner_id: "test-owner-id",
            owner_name: "test-owner-name",
          },
        }),
      { wrapper },
    );

    expect(result.current[0]).toBe(true);
  });

  it("Should return true if the user is the owner of the coffee", async () => {
    const initialState = {
      user: {
        userName: "test-user-name",
        userId: "test-user-id",
        userRole: "User",
        owner_id: "test-owner-id",
      },
    };

    const store = mockStore(initialState);

    const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () =>
        useEditCoffeeDecider({
          coffee: {
            _id: "test-id",
            name: "test-name",
            roasting_company: "test-roasting-company",
            owner_id: "test-user-id",
            owner_name: "test-owner-name",
          },
        }),
      { wrapper },
    );

    expect(result.current[0]).toBe(true);
  });

  it("Should return false if the user is not the owner of the coffee nor admin", async () => {
    const initialState = {
      user: {
        userName: "test-user-name",
        userId: "test-user-id",
        userRole: "User",
        owner_id: "test-owner-id",
      },
    };

    const store = mockStore(initialState);

    const wrapper: React.FC<{ children: ReactNode }> = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const { result } = renderHook(
      () =>
        useEditCoffeeDecider({
          coffee: {
            _id: "test-id",
            name: "test-name",
            roasting_company: "test-roasting-company",
            owner_id: "other-user-id",
            owner_name: "test-owner-name",
          },
        }),
      { wrapper },
    );

    expect(result.current[0]).toBe(false);
  });
});
