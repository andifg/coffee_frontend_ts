import { useAuth } from "react-oidc-context";

interface Props {
  children: JSX.Element;
}

const PrivateRoute = (props: Props) => {
  const auth = useAuth();

  return <>{auth.user && !auth.isLoading && props.children}</>;
};

export default PrivateRoute;
