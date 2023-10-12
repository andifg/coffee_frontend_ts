import React from "react";
import { CoffeesService, Coffee as CoffeeSchema } from "../../../client";
import { addCoffeeId } from "../../../redux/CoffeeIdsReducer";
import { useDispatch } from "react-redux";
import { ApiError } from "../../../client";
import { CoffeeImagesService } from "../../../client";
import { Body__create_image_api_v1_coffees__coffee_id__image_post } from "../../../client";
import CoffeeDialog from "../../Common/CoffeeDialog";

interface Props {
  closeModal: () => void;
  open: boolean;
  currentUUID: string;
}

const AddModal: React.FC<Props> = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();
  const dispatch = useDispatch();

  const addCoffee = async (newCoffee: CoffeeSchema) => {
    const response = await CoffeesService.postCoffeeApiV1CoffeesPost(newCoffee);
    console.log(response);
  };

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

      await CoffeeImagesService.createImageApiV1CoffeesCoffeeIdImagePost(
        props.currentUUID,
        imagepost,
      );
    }
  };

  const handleSubmit = async (coffeeName: string, image: File | undefined) => {
    if (coffeeName === "") {
      setError("Coffee name cannot be empty");
      return;
    }

    try {
      await addCoffee({ _id: props.currentUUID, name: coffeeName.trim() });

      await uploadImage(image);

      setError(undefined);
      setLoading(true);

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

  return (
    <CoffeeDialog
      open={props.open}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      image={undefined}
      error={error}
      setError={setError}
      coffeeName={undefined}
      loading={loading}
      setLoading={setLoading}
      title="Add Coffee"
    />
  );
};
export default AddModal;
