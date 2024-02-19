import React from "react";
import { ApiError } from "../../../client";
import CoffeeDialog from "../../../components/CoffeeDialog";
import { useUpdateCoffeeData } from "../../../hooks/useUpdateCoffeeData";

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

  const [updateCoffee, uploadImage] = useUpdateCoffeeData({
    coffee_id: props.coffee_id,
    initalCoffeeName: props.initalCoffeeName,
    updateCoffeeName: props.updateCoffeeName,
    initalCoffeeImageURL: props.initalCoffeeImageURL,
    updateCoffeeImage: props.updateCoffeeImage,
  });

  const handleCancel = () => {
    props.closeModal();
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
