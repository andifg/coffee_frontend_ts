import { useState } from "react";
import { useContext } from "react";
import { AddRatingToCoffeeContext } from "../Board/Board";
import { uuidv7 } from "uuidv7";
import useClientService from "../../hooks/useClientService";
import {
  RatingsService,
  CreateRating,
  BrewingMethod,
  CoffeeDrinkImagesService,
  Body__create_image_api_v1_coffee_drink__coffee_drink_id__image_post,
} from "../../client";
import { useSearchParams } from "react-router-dom";
import { createDataURL } from "../../utils/FileReader";
import heic2any from "heic2any";
import React from "react";

interface Props {
  close: () => void;
}

interface Params {
  coffeeId?: string;
  coffeeName?: string;
  roastingCompany?: string;
  brewingMethod?: string;
  brewingRating?: string;
}

const useAddCoffeeBrewRating = (
  props: Props,
): [
  string | undefined,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  boolean,
  string | null,
  ({ brewingMethod, brewingRating }: Params) => void,
  () => Promise<void>,
  string,
  string,
  string,
  string,
] => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = React.useState<File | undefined>();
  const [imageURL, setImageURL] = React.useState<string | undefined>();

  const [callClientServiceMethod] = useClientService();

  const addRatingToCoffee = useContext(AddRatingToCoffeeContext);

  const currentUuid = uuidv7();

  const coffeeId: string = searchParams.get("coffeeId") ?? "";
  const coffeeName: string = searchParams.get("coffeeName") ?? "";
  const roastingCompany: string = searchParams.get("roastingCompany") ?? "";
  const method: string = searchParams.get("brewingMethod") ?? "";
  const rating: string = searchParams.get("brewingRating") ?? "";

  const setParams = ({
    brewingMethod = method,
    brewingRating = rating,
  }: Params) => {
    setError(null);
    const newParams: Params = {
      coffeeId,
      coffeeName,
      roastingCompany,
      brewingMethod,
      brewingRating,
    };
    setSearchParams(newParams as Record<string, string>);
  };

  const submit = async () => {
    setLoading(true);

    if (!rating) {
      setError("Rating is required");
      setLoading(false);
      return;
    }

    if (!method) {
      setError("Brewing method is required");
      setLoading(false);
      return;
    }

    try {
      const currentRating: CreateRating = {
        _id: currentUuid,
        coffee_id: coffeeId,
        brewing_method: method as BrewingMethod,
        rating: parseFloat(rating),
      };
      await callClientServiceMethod({
        function:
          RatingsService.createCoffeeRatingApiV1CoffeesCoffeeIdRatingsPost,
        rethrowError: true,
        args: [currentRating],
      });

      if (image) {
        const imageBody: Body__create_image_api_v1_coffee_drink__coffee_drink_id__image_post =
          {
            file: image,
          };

        await callClientServiceMethod({
          function:
            CoffeeDrinkImagesService.createImageApiV1CoffeeDrinkCoffeeDrinkIdImagePost,
          rethrowError: true,
          args: [currentUuid, imageBody],
        });
      }

      addRatingToCoffee(currentRating);

      setTimeout(() => {
        setLoading(false);
        props.close();
      }, 200);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
        setLoading(false);
        setError(e.message);
      }
    }
  };

  const convertHEICtoPNG = async (file: File): Promise<File> => {
    const startTime = new Date();

    const png = await heic2any({
      blob: file,
      toType: "image/png",
      quality: 0.5,
    });

    const endTime = new Date();
    const elapsedTime = endTime.getTime() - startTime.getTime();

    console.log(`Converted HEIC to PNG in ${elapsedTime} milliseconds`);

    let png_file: File;
    if (png instanceof Blob && Array.isArray(png) === false) {
      png_file = new File([png], "image.png", { type: "image/png" });
      return png_file;
    } else {
      const blob_array = png as Blob[];

      png_file = new File(blob_array, "image.png", { type: "image/png" });
      return png_file;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log("File change");
    let file: File;
    if (event.target.files && event.target.files?.length != 0) {
      console.log(event.target.files?.length);
      const filetype = event.target.files[0].type;
      if (filetype === "image/heic") {
        console.log("Converting HEIC to PNG");
        file = await convertHEICtoPNG(event.target.files[0]);
      } else {
        file = event.target.files[0];
      }
      setImage(file);
      setImageURL(await createDataURL(file));
    }
  };

  return [
    imageURL,
    handleFileChange,
    loading,
    error,
    setParams,
    submit,
    coffeeName,
    roastingCompany,
    method,
    rating,
  ];
};

export { useAddCoffeeBrewRating };
