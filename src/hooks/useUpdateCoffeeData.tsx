import useClientService from "./useClientService";

import { CoffeesService, UpdateCoffee as UpdateCoffeeSchema } from "../client";

import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../client";

import { CoffeeImagesService } from "../client";

interface UseUpdateCofeeDataProps {
  coffee_id: string;
  initalCoffeeName: string;
  updateCoffeeName: (newCoffeeName: string) => void;
  initalCoffeeImageURL: string | undefined;
  updateCoffeeImage: (newCoffeeImage: File) => void;
}

export function useUpdateCoffeeData(
  props: UseUpdateCofeeDataProps,
): [
  (coffeeName: string, ownerId: string, ownerName: string) => Promise<void>,
  (image: File) => Promise<void>,
] {
  const [callClientServiceMethod] = useClientService();

  const updateCoffee = async (
    coffeeName: string,
    ownerId: string,
    ownerName: string,
  ) => {
    if (coffeeName != props.initalCoffeeName) {
      const updatedCoffee: UpdateCoffeeSchema = {
        name: coffeeName,
        owner_id: ownerId,
        owner_name: ownerName,
      };

      await callClientServiceMethod({
        function: CoffeesService.patchCoffeeApiV1CoffeesCoffeeIdPatch,
        rethrowError: true,
        args: [props.coffee_id, updatedCoffee],
      });

      props.updateCoffeeName(coffeeName); // Update the coffee name in the parent component
      console.log("Coffee name successfully changed");
      return;
    }
    console.log("Coffee name hasn't changed");
  };

  const uploadImage = async (image: File) => {
    const imagepost: Body__create_image_api_v1_coffees__coffee_id__image_post =
      {
        file: image,
      };

    await callClientServiceMethod({
      function: CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost,
      rethrowError: true,
      args: [props.coffee_id, imagepost],
    });

    props.updateCoffeeImage(image); // Update the image in the parent component
    console.log("Coffee image successfully changed");
  };

  return [updateCoffee, uploadImage];
}
