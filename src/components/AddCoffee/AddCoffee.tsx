import React from "react";
import CoffeeDialog from "../DialogCoffee/CoffeeDialog";
import { useAddCoffeeModal } from "./useAddCoffee";
import { uuidv7 } from "uuidv7";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCoffeeModal: React.FC<Props> = (props) => {
  const currentUUID = uuidv7();

  const closeModal = () => {
    console.log("Clicked cancel button");
    props.setOpen(false);
  };

  const { loading, error, handleCancel, handleSubmit, setError, setLoading } =
    useAddCoffeeModal({
      closeModal: closeModal,
      currentUUID: currentUUID,
      open: props.open,
    });

  return (
    <CoffeeDialog
      open={props.open}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      imageURL={undefined}
      error={error}
      setError={setError}
      coffeeName={undefined}
      roastingCompany={undefined}
      loading={loading}
      setLoading={setLoading}
    />
  );
};
export default AddCoffeeModal;
