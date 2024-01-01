import { useAuth } from "react-oidc-context";

export default function useClientService() {
  const auth = useAuth();

  const callClientServiceMethod = async <T,>(
    func: (...args: any[]) => Promise<T>,
    rethrowError: boolean,
    ...args: any[]
  ): Promise<T> => {
    try {
      return await func(...args);
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

      if (rethrowError) {
        throw e;
      }
    }

    return undefined as T;
  };

  return [callClientServiceMethod];
}
