import useClientService from "../../../hooks/useClientService";

import {
  CoffeesService,
  UpdateCoffee as UpdateCoffeeSchema,
  Coffee as CoffeeSchema,
} from "../../../client";

import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../../../client";

import { CoffeeImagesService } from "../../../client";

import { UpdateCoffeeContext } from "../../CoffeeBeanBoard/CoffeeBeanBoard";
import { UpdateCoffeeImageContext } from "../CoffeeCard/CoffeeCard";
import { useContext } from "react";

interface UseUpdateCofeeDataProps {
  coffee_id: string;
  initalCoffeeName: string;
  initialRoastingCompany: string;
  initalCoffeeImageURL: string | undefined;
}

export function useUpdateCoffeeData(
  props: UseUpdateCofeeDataProps,
): [
  (
    coffeeName: string,
    roasting_company: string,
    ownerId: string,
    ownerName: string,
  ) => Promise<void>,
  (image: File) => Promise<void>,
] {
  const [callClientServiceMethod] = useClientService();
  const updateCoffeeInContext = useContext(UpdateCoffeeContext);
  const updateCoffeeImage = useContext(UpdateCoffeeImageContext);

  const deleteEntryFromCache = async () => {
    try {
      const cache = await caches.open("coffee-images");
      cache.keys().then((keys) => {
        keys.forEach((key) => {
          if (key.url.includes(props.coffee_id)) {
            cache.delete(key);
          }
        });
      });
    } catch (error) {
      console.log("Error deleting cache entry: ", error);
    }
  };

  const updateCoffee = async (
    coffeeName: string,
    roasting_company: string,
    ownerId: string,
    ownerName: string,
  ) => {
    if (
      coffeeName != props.initalCoffeeName ||
      roasting_company != props.initialRoastingCompany
    ) {
      const updatedCoffee: UpdateCoffeeSchema = {
        name: coffeeName,
        roasting_company: roasting_company,
        owner_id: ownerId,
        owner_name: ownerName,
      };

      await callClientServiceMethod({
        function: CoffeesService.patchCoffeeApiV1CoffeesCoffeeIdPatch,
        rethrowError: true,
        args: [props.coffee_id, updatedCoffee],
      });

      updateCoffeeInContext({
        _id: props.coffee_id,
        name: coffeeName,
        roasting_company: roasting_company,
        owner_id: ownerId,
        owner_name: ownerName,
      } as CoffeeSchema);
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

    await deleteEntryFromCache();

    updateCoffeeImage(image); // Update the image in the parent component
    console.log("Coffee image successfully changed");
  };

  return [updateCoffee, uploadImage];
}
