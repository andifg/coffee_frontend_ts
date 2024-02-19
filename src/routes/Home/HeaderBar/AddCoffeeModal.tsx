import React from "react";
import CoffeeDialog from "../../../components/CoffeeDialog";
import { useAddCoffeeModal } from "../../../hooks/useAddCoffeeModal";

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
