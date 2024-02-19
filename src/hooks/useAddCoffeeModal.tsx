import { ApiError } from "../client";
import React from "react";
import { useDispatch } from "react-redux";
import { CoffeesService, CoffeeImagesService } from "../client";
import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../client";
import { addCoffeeId } from "../redux/CoffeeIdsReducer";
import useClientService from "./useClientService";

interface UseAddCoffeeModalProps {
  closeModal: () => void;
  open: boolean;
  currentUUID: string;
}

const useAddCoffeeModal = (props: UseAddCoffeeModalProps) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();
  const [callClientServiceMethod] = useClientService();

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.closeModal();
  };

  const uploadImage = async (image: File | undefined) => {
    if (image) {
      const imagepost: Body__create_image_api_v1_coffees__coffee_id__image_post =
        {
          file: image,
        };

      await callClientServiceMethod({
        function: CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost,
        args: [props.currentUUID, imagepost],
      });
    }
  };

  const handleSubmit = async (coffeeName: string, image: File | undefined) => {
    if (coffeeName === "") {
      setError("Coffee name cannot be empty");
      return;
    }

    try {
      setError(undefined);
      setLoading(true);

      await callClientServiceMethod({
        function: CoffeesService.postCoffeeApiV1CoffeesPost,
        args: [{ _id: props.currentUUID, name: coffeeName.trim() }],
      });

      await uploadImage(image);

      console.log("Submitted " + '"' + coffeeName.trim() + '"');
      setTimeout(() => {
        dispatch(addCoffeeId(props.currentUUID));
        setLoading(false);
        props.closeModal();
      }, 500);
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        console.log("Add new entry failed:", e.body.detail);
        setLoading(false);
        setError(e.body.detail);
      }
    }
  };

  return {
    loading,
    error,
    handleCancel,
    handleSubmit,
    setError,
    setLoading,
  };
};

export { useAddCoffeeModal };
