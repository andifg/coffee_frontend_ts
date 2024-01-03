import { useAuth } from "react-oidc-context";

interface ClientCallConfig<T, K extends unknown[]> {
  function: (...args: K) => Promise<T>;
  rethrowError?: boolean | undefined;
  args: K;
}

export default function useClientService() {
  const auth = useAuth();

  const callClientServiceMethod = async <T, K extends unknown[]>(
    clientCallConfig: ClientCallConfig<T, K>,
  ): Promise<T> => {
    try {
      return await clientCallConfig.function(...clientCallConfig.args);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log("Error during fetch of coffee");
        console.log(e);

        if (e.message === "Unauthorized") {
          console.log("UnauthorizedApiException");
          auth.removeUser();
          return undefined as T;
        }
      }

      if (clientCallConfig.rethrowError) {
        throw e;
      }
    }

    return undefined as T;
  };

  return [callClientServiceMethod];
}
