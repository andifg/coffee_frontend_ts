import { useAuth } from "react-oidc-context";
import { OpenAPI } from "../client";
import { setUserName, setGivenName } from "../redux/UserReducer";
import { useDispatch } from "react-redux";

const useAuthWrapper = () => {
  const auth = useAuth();

  console.log(auth);

  const dispatch = useDispatch();

  const getUserToken = async () => {
    return auth.user?.access_token || "";
  };

  OpenAPI.TOKEN = getUserToken;

  if (auth.user?.profile) {
    if (auth.user.profile.name) {
      dispatch(setUserName(auth.user.profile.name));
    }
    if (auth.user.profile.given_name) {
      dispatch(setGivenName(auth.user.profile.given_name));
    }
  }

  if (!auth.user && !auth.isLoading && window.location.pathname != "/") {
    console.log("User not logged in, redirecting to login page");
    console.log(auth);

    window.location.href = "/";
  }
};

export default useAuthWrapper;
