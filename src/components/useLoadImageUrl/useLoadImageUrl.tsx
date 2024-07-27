import React, { useEffect, useState } from "react";
import { createDataURL } from "../../utils/FileReader";
import { useAuth } from "react-oidc-context";

function useLoadImageUrl(
  backendPath: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  instantLoad: boolean = false,
): [string, () => Promise<void>, (newCoffeeImage: File) => void] {
  const [imageURL, setImageURL] = useState<string>("");
  const auth = useAuth();

  const updateImageUrl = (newImage: File) => {
    console.log("Updating image url");
    createDataURL(newImage).then((dataURL) => {
      setImageURL(dataURL);
    });
  };

  const fetchImageAndCreateUrl = async () => {
    // Would like to use the auto generated Client here, but due to an error
    // that converts the binary data always to text I have to use fetch.
    // There is a PR open to fix this issue:
    // https://github.com/ferdikoomen/openapi-typescript-codegen/pull/986
    // const coffeeImageBinary = await CoffeeImagesService.getImageApiV1CoffeesCoffeeIdImageGet(coffee._id);
    // const coffeeImageBlob = new Blob([coffeeImageBinary], {type: "image/jpeg"})
    // TODO: Migrate to https://github.com/hey-api/openapi-ts for client generation

    setLoading(true);

    try {
      const response = await fetch(`${window.env.BACKEND_URL}${backendPath}`, {
        method: "GET",
        headers: {
          Accept: "image/jpeg",
          Authorization: `Bearer ${auth.user?.access_token}`,
        },
      });

      if (response.ok) {
        const coffeeImageBlob = await response.blob();
        const imageURL = await createDataURL(coffeeImageBlob);
        setImageURL(imageURL);
        setLoading(false);
        return Promise.resolve();
      } else if (response.status === 401) {
        console.log("UnauthorizedApiException");
        auth.removeUser();
      } else {
        console.error(
          `Unsuccessfull image fetch, got response status : ${response.status}`,
        );
        setLoading(false);
      }
    } catch (error) {
      console.error("Not able to call image server: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!instantLoad) {
      return;
    }
    fetchImageAndCreateUrl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [backendPath]);

  return [imageURL, fetchImageAndCreateUrl, updateImageUrl];
}

export { useLoadImageUrl };
