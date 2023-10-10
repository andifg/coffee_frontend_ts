import React, { useEffect } from "react";
import {
  CoffeesService,
  UpdateCoffee as UpdateCoffeeSchema,
} from "../../../client";
import { ApiError } from "../../../client";
import { CoffeeImagesService } from "../../../client";
import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../../../client";
import CoffeeDialog from "../../Common/CoffeeDialog";

interface Props {
  closeModal: () => void;
  open: boolean;
  coffee_id: string;
  initalCoffeeName: string;
  updateCoffeeName: (newCoffeeName: string) => void;
  initalCoffeeImage: File | undefined;
  updateCoffeeImage: (newCoffeeImage: File) => void;
}

const EditCoffeeModal: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const [coffeeName, setCoffeeName] = React.useState<string>("");
  const [image, setImage] = React.useState<File | undefined>();

  const updateCoffee = async () => {
    if (coffeeName != props.initalCoffeeName) {
      const updatedCoffee: UpdateCoffeeSchema = {
        name: coffeeName,
      };
      const response =
        await CoffeesService.patchCoffeeApiV1CoffeesCoffeeIdPatch(
          props.coffee_id,
          updatedCoffee,
        );
      props.updateCoffeeName(coffeeName);
      console.log("Coffee name successfully changed");
      console.log(response);
      return;
    }
    console.log("Coffee name hasn't changed");
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setCoffeeName("");
    setLoading(false);
    setError(undefined);
    // setModalText(false);
    setImage(undefined);
    props.closeModal();
  };

  const uploadImage = async () => {
    if (image && image != props.initalCoffeeImage) {
      const imagepost: Body__create_image_api_v1_coffees__coffee_id__image_post =
        {
          file: image,
        };

      await CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost(
        props.coffee_id,
        imagepost,
      );
      props.updateCoffeeImage(image);
      console.log("Coffee image successfully changed");
      return;
    }
    console.log("Coffee Image hasn't changed");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (coffeeName === "") {
      setError("Coffee name cannot be empty");
      return;
    }

    try {
      await updateCoffee();

      await uploadImage();

      setError(undefined);
      setLoading(true);

      console.log("Submitted " + '"' + coffeeName.trim() + '"');
      setTimeout(() => {
        setLoading(false);
        props.closeModal();
        setCoffeeName("");
        setImage(undefined);
      }, 500);
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        console.log("Update coffee failed:", e.body.detail);
        setLoading(false);
        setError(e.body.detail);
      }
    }
  };

  // Event handler for file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("File change");
    if (event.target.files && event.target.files?.length != 0) {
      console.log(event.target.files?.length);
      const file = event.target.files[0];
      setImage(file);
    }
  };

  const handleCoffeeInputNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setCoffeeName(e.target.value);
    if (error) {
      setError(undefined);
    }
  };

  useEffect(() => {
    setCoffeeName(props.initalCoffeeName);
    setImage(props.initalCoffeeImage);
  }, [props.initalCoffeeName, props.initalCoffeeImage]);

  return (
    <CoffeeDialog
      open={props.open}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleFileChange={handleFileChange}
      handleCoffeeInputNameChange={handleCoffeeInputNameChange}
      image={image}
      error={error}
      coffeeName={coffeeName}
      loading={loading}
      title={"Edit " + props.initalCoffeeName}
    />
  );
};
export default EditCoffeeModal;
