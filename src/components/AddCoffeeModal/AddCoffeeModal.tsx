import React from "react";
import CoffeeDialog from "../DialogCoffee/CoffeeDialog";
import { useAddCoffeeModal } from "./useAddCoffeeModal";

interface Props {
  closeModal: () => void;
  open: boolean;
  currentUUID: string;
}

const AddModal: React.FC<Props> = (props) => {
  const { loading, error, handleCancel, handleSubmit, setError, setLoading } =
    useAddCoffeeModal(props);

  return (
    <CoffeeDialog
      open={props.open}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      imageURL={undefined}
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
