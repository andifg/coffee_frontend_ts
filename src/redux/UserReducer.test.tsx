import { describe, expect, it } from "vitest";
import UserReducer from "./UserReducer";
import { setUserRole, setUserName, setGivenName } from "./UserReducer";

describe("UserReducer", () => {
  it("Should set user role", () => {
    expect(
      UserReducer(
        {
          userRole: "User",
        },
        setUserRole("Admin"),
      ),
    ).toEqual({
      userRole: "Admin",
    });
  });

  it("Should set user name", () => {
    expect(
      UserReducer(
        {
          username: "username",
          userRole: "User",
        },
        setUserName("new User Name"),
      ),
    ).toEqual({
      username: "new User Name",
      userRole: "User",
    });
  });

  it("Should set given name", () => {
    expect(
      UserReducer(
        {
          givenName: "givenName",
          userRole: "User",
        },
        setGivenName("new Given Name"),
      ),
    ).toEqual({
      givenName: "new Given Name",
      userRole: "User",
    });
  });
});
