import { SyntheticEvent, useRef, useState } from "react";
import { useContext } from "react";
import { AddDrinkCallbackContext } from "../AddDrinkContext/AddDrinkCallbackContext";
import { AddDrinkToCoffeeBeanContext } from "../AddDrinktoCoffeeBeanContext/AddDrinkToCoffeeBeanContext";
import { uuidv7 } from "uuidv7";
import { DrinkType } from "./DrinkType";
import useClientService from "../../hooks/useClientService";
import { RootState } from "../../redux";
import { useSelector } from "react-redux";
import {
  BrewingMethod,
  DrinksService,
  CreateDrink,
  DrinkImagesService,
  Body__create_image_api_v1_drinks__drink_id__image_post,
  Drink,
  Coffee,
  CoffeesService,
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
  coffeeName?: string | null;
  coffeeBeanOwner?: string | null;
  coffeeBeanOwnerId?: string | null;
  roastingCompany?: string | null;
  brewingMethod?: string;
  brewingRating?: string;
  drinkType?: string;
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
  string | undefined,
  string,
  DrinkType | undefined,
  Coffee[],
  Coffee | null,
  (_: React.SyntheticEvent, newValue: Coffee | null) => void,
  (newValue: string | null) => void,
] => {
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  const [image, setImage] = React.useState<File | undefined>();
  const [imageURL, setImageURL] = React.useState<string | undefined>();


  const userLocation = useRef<{longitude: number, latitude: number} | null>(null);

  const [callClientServiceMethod] = useClientService();

  const user = useSelector((state: RootState) => state.user);

  const { addDrinkCallback } = useContext(AddDrinkCallbackContext);
  const { addDrinkToCoffeeCallback } = useContext(AddDrinkToCoffeeBeanContext);

  const currentUuid = uuidv7();

  const coffeeIdParam: string | undefined =
    searchParams.get("coffeeId") ?? undefined;
  const coffeeNameParam: string | undefined =
    searchParams.get("coffeeName") ?? undefined;
  const coffeeBeanOwnerParam: string | undefined =
    searchParams.get("coffeeBeanOwner") ?? undefined;
  const coffeeBeanOwnerIdParam: string | undefined =
    searchParams.get("coffeeBeanOwnerId") ?? undefined;
  const roastingCompanyParam: string | undefined =
    searchParams.get("roastingCompany") ?? undefined;
  const method: string | undefined =
    searchParams.get("brewingMethod") ?? undefined;
  const rating: string = searchParams.get("brewingRating") ?? "";
  const drinkType: DrinkType | undefined = (searchParams.get("drinkType") ??
    undefined) as DrinkType | undefined;

  const image_exists = useRef(false);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          userLocation.current = { latitude, longitude };
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    else {
      console.error('Geolocation is not supported by this browser.');
    }

  const setParams = ({
    brewingMethod = method,
    brewingRating = rating,
    coffeeName = coffeeNameParam,
    coffeeBeanOwner = coffeeBeanOwnerParam,
    coffeeBeanOwnerId = coffeeBeanOwnerIdParam,
    roastingCompany = roastingCompanyParam,
    coffeeId = coffeeIdParam,
  }: Params) => {
    setError(null);
    const newParams: Params = {
      ...(coffeeId ? { coffeeId } : {}),
      ...(coffeeName ? { coffeeName } : {}),
      ...(coffeeBeanOwner ? { coffeeBeanOwner } : {}),
      ...(coffeeBeanOwnerId ? { coffeeBeanOwnerId } : {}),
      ...(roastingCompany ? { roastingCompany } : {}),
      ...(brewingMethod ? { brewingMethod } : {}),
      ...(brewingRating ? { brewingRating } : {}),
      ...(drinkType ? { drinkType } : {}),
    };
    setSearchParams(newParams as Record<string, string>);
  };

  const [beanOptions, setBeanOptions] = useState<Coffee[]>([]);

  const [currentBean, setCurrentBean] = useState<Coffee | null>(() => {
    if (
      coffeeNameParam &&
      roastingCompanyParam &&
      coffeeBeanOwnerParam &&
      coffeeIdParam &&
      coffeeBeanOwnerIdParam
    ) {
      return {
        name: coffeeNameParam,
        roasting_company: roastingCompanyParam,
        owner_name: coffeeBeanOwnerParam,
        owner_id: coffeeBeanOwnerIdParam,
        _id: coffeeIdParam,
      };
    }
    return null;
  });

  const handleCoffeeBeanChange = (
    _: SyntheticEvent,
    newValue: Coffee | null,
  ) => {
    setCurrentBean(newValue);
    setParams({
      coffeeName: newValue?.name,
      roastingCompany: newValue?.roasting_company,
      coffeeBeanOwner: newValue?.owner_name,
      coffeeBeanOwnerId: newValue?.owner_id,
      coffeeId: newValue?._id,
    });
  };

  async function fetchBeansForSearchTerm(value: string | null) {
    if (value == null) {
      setParams({
        coffeeName: null,
        roastingCompany: null,
      });
    }

    const result = await callClientServiceMethod({
      function: CoffeesService.listCoffeesWithRatingSummaryApiV1CoffeesGet,
      rethrowError: true,
      args: [1, 10, null, null, value],
    });

    setBeanOptions(result);
  }

  const submit = async () => {
    setLoading(true);

    if (!rating) {
      setError("Rating is required");
      setLoading(false);
      return;
    }

    if (!drinkType && (!coffeeNameParam || !roastingCompanyParam)) {
      setError("Fill in missing information");
      setLoading(false);
      return;
    }

    try {
      const currentRating: CreateDrink = {
        _id: currentUuid,
        coffee_bean_id: coffeeIdParam,
        brewing_method: method as BrewingMethod,
        rating: parseFloat(rating),
        image_exists: image_exists.current,
        coordinate: userLocation.current,
      };
      await callClientServiceMethod({
        function: DrinksService.createDrinkApiV1DrinksPost,
        rethrowError: true,
        args: [currentRating],
      });

      if (image) {
        const imageBody: Body__create_image_api_v1_drinks__drink_id__image_post =
          {
            file: image,
          };

        await callClientServiceMethod({
          function: DrinkImagesService.createImageApiV1DrinksDrinkIdImagePost,
          rethrowError: true,
          args: [currentUuid, imageBody],
        });
      }

      if (currentRating.coffee_bean_id) {
        addDrinkToCoffeeCallback(currentRating);
      }

      addDrinkCallback({
        ...currentRating,
        user_id: user.userId,
        user_name: user.username,
        coffee_bean_id: coffeeIdParam,
        coffee_bean_name: coffeeNameParam,
        coffee_bean_owner: coffeeBeanOwnerParam,
        coffee_bean_roasting_company: roastingCompanyParam,
      } as Drink);

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
      image_exists.current = true;
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
    method,
    rating,
    drinkType,
    beanOptions,
    currentBean,
    handleCoffeeBeanChange,
    fetchBeansForSearchTerm,
  ];
};

export { useAddCoffeeBrewRating };
