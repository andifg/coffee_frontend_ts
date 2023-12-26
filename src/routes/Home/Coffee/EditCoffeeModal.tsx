import React from "react";
import {
  CoffeesService,
  UpdateCoffee as UpdateCoffeeSchema,
} from "../../../client";
import { ApiError } from "../../../client";
import { CoffeeImagesService } from "../../../client";
import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../../../client";
import CoffeeDialog from "../../../components/CoffeeDialog";
import { useAuth } from "react-oidc-context";

interface Props {
  closeModal: () => void;
  open: boolean;
  coffee_id: string;
  initalCoffeeName: string;
  updateCoffeeName: (newCoffeeName: string) => void;
  initalCoffeeImageURL: string | undefined;
  updateCoffeeImage: (newCoffeeImage: File) => void;
}

const EditCoffeeModal: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const auth = useAuth();

  const updateCoffee = async (coffeeName: string) => {
    if (coffeeName != props.initalCoffeeName) {
      const updatedCoffee: UpdateCoffeeSchema = {
        name: coffeeName,
      };
      const response =
        await CoffeesService.patchCoffeeApiV1CoffeesCoffeeIdPatch(
          props.coffee_id,
          updatedCoffee,
        );
      props.updateCoffeeName(coffeeName); // Update the coffee name in the parent component
      console.log("Coffee name successfully changed");
      console.log(response);
      return;
    }
    console.log("Coffee name hasn't changed");
  };

  const handleCancel = () => {
    props.closeModal();
  };

  const uploadImage = async (image: File) => {
    const imagepost: Body__create_image_api_v1_coffees__coffee_id__image_post =
      {
        file: image,
      };

    await CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost(
      props.coffee_id,
      imagepost,
    );
    props.updateCoffeeImage(image); // Update the image in the parent component
    console.log("Coffee image successfully changed");
  };

  const handleSubmit = async (coffeeName: string, image: File) => {
    if (coffeeName === "") {
      setError("Coffee name cannot be empty");
      return;
    }

    try {
      await updateCoffee(coffeeName);
      await uploadImage(image);

      setError(undefined);
      setLoading(true);

      console.log("Submitted " + '"' + coffeeName.trim() + '"');
      setTimeout(() => {
        setLoading(false);
        props.closeModal();
      }, 500);
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        console.log("Update coffee failed:", e.body.detail);
        setLoading(false);
        setError(e.body.detail);

        if (e.message === "Unauthorized") {
          console.log("UnauthorizedApiException");
          auth.removeUser();
        }
      }
    }
  };

  return (
    <CoffeeDialog
      open={props.open}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      imageURL={props.initalCoffeeImageURL}
      error={error}
      setError={setError}
      coffeeName={props.initalCoffeeName}
      loading={loading}
      setLoading={setLoading}
      title={"Edit " + props.initalCoffeeName}
    />
  );
};
export default EditCoffeeModal;
