import { useState } from "react";
import { createDataURL } from "../utils/FileReader";
import { useAuth } from "react-oidc-context";

export default function useLoadImageURL(
  imageID: string,
): [string, () => Promise<void>, (newCoffeeImage: File) => void] {
  const [imageURL, setImageURL] = useState<string>("");

  const auth = useAuth();

  const updateCoffeeImage = (newCoffeeImage: File) => {
    console.log("Updating coffee image");
    createDataURL(newCoffeeImage).then((dataURL) => {
      setImageURL(dataURL);
    });
  };

  const fetchImage = async () => {
    // Would like to use the auto generated Client here, but due to an error
    // that converts the binary data always to text I have to use fetch.
    // There is a PR open to fix this issue:
    // https://github.com/ferdikoomen/openapi-typescript-codegen/pull/986
    // const coffeeImageBinary = await CoffeeImagesService.getImageApiV1CoffeesCoffeeIdImageGet(coffee._id);
    // const coffeeImageBlob = new Blob([coffeeImageBinary], {type: "image/jpeg"})
    try {
      const response = await fetch(
        `${window.env.BACKEND_URL}/api/v1/coffees/${imageID}/image`,
        {
          method: "GET",
          headers: {
            Accept: "image/jpeg",
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        },
      );

      if (response.ok) {
        const coffeeImageBlob = await response.blob();
        const imageURL = await createDataURL(coffeeImageBlob);
        setImageURL(imageURL);
        return Promise.resolve();
      } else if (response.status === 401) {
        console.log("UnauthorizedApiException");
        auth.removeUser();
      } else {
        console.error(`Unexpected response status: ${response.status}`);
        return Promise.reject(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("An error occurred during image fetch:", error);
      return Promise.reject("An error occurred during image fetch");
    }
  };

  return [imageURL, fetchImage, updateCoffeeImage];
}
