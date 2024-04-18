import { useAuth } from "react-oidc-context";
import { OpenAPI } from "../client";
import { setUserName, setGivenName, setFamilyName, setUserId, setUserRole } from "../redux/UserReducer/UserReducer";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";


import { JwtPayload } from "jwt-decode";


interface CoffeeAppJWT extends JwtPayload {
  realm_access: {
    roles: string[];
  };
}

const useAuthWrapper = () => {
  const auth = useAuth();

  console.log(auth);

  const dispatch = useDispatch();

  const getUserToken = async () => {
    return auth.user?.access_token || "";
  };

  OpenAPI.TOKEN = getUserToken;

  if (auth.user?.profile) {
    if (auth.user.profile.preferred_username) {
      dispatch(setUserName(auth.user.profile.preferred_username));
    }
    if (auth.user.profile.given_name) {
      dispatch(setGivenName(auth.user.profile.given_name));
    }
    if (auth.user.profile.family_name) {
      dispatch(setFamilyName(auth.user.profile.family_name));
    }
    if (auth.user.profile.sub) {
      dispatch(setUserId(auth.user.profile.sub));
    }

    // Decode the token for non standard claims
    if (auth.user.access_token) {
      const decodedToken = jwtDecode<CoffeeAppJWT>(auth.user.access_token);

      if(decodedToken.realm_access.roles.includes("Admin")) {
        dispatch(setUserRole("Admin"));
      }
    }
  }

  if (!auth.user && !auth.isLoading && window.location.pathname != "/") {
    console.log("User not logged in, redirecting to login page");
    console.log(auth);

    window.location.href = "/";
  }
};

export default useAuthWrapper;
