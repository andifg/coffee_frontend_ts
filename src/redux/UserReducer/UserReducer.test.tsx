import { describe, expect, it } from "vitest";
import UserReducer from "./UserReducer";
import {
  setUserRole,
  setUserName,
  setGivenName,
  setFamilyName,
  setUserId,
} from "./UserReducer";

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

  it("Should set family name", () => {
    expect(
      UserReducer(
        {
          username: "kcowan",
          givenName: "Kristofer",
          familyName: "Cowan",
          userId: "018ef1bb-c943-7253-bdc5-dd653b1b0f0e",
          userRole: "Admin",
        },
        setFamilyName("Smith"),
      ),
    ).toEqual({
      username: "kcowan",
      givenName: "Kristofer",
      familyName: "Smith",
      userId: "018ef1bb-c943-7253-bdc5-dd653b1b0f0e",
      userRole: "Admin",
    });
  });

  it("Should set user Id", () => {
    expect(
      UserReducer(
        {
          username: "kcowan",
          givenName: "Kristofer",
          familyName: "Cowan",
          userId: "018ef1bb-c943-7253-bdc5-dd653b1b0f0e",
          userRole: "Admin",
        },
        setUserId("018ef1c2-3f87-7e6b-af2d-040ec724061b"),
      ),
    ).toEqual({
      username: "kcowan",
      givenName: "Kristofer",
      familyName: "Cowan",
      userId: "018ef1c2-3f87-7e6b-af2d-040ec724061b",
      userRole: "Admin",
    });
  });
});
