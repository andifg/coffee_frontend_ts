import React from "react";
import { Modal, Form } from "antd";
import AddForm from "./Form";
import { CoffeesService, Coffee as CoffeeSchema } from "../../../client";
import { addCoffeeId } from "../../../redux/CoffeeIdsReducer";
import { useDispatch } from "react-redux";
import { ApiError } from "../../../client";

interface Props {
  closeModal: () => void;
  open: boolean;
  currentUUID: string;
}

const AddModal: React.FC<Props> = (props) => {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string | boolean>(false);
  const [error, setError] = React.useState<boolean>(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const handleOk = async () => {
    try {
      setError(false);
      setModalText("Thanks, your input is getting stored");
      setConfirmLoading(true);
      const values = await form.validateFields();
      console.log(values);

      await addCoffee({ _id: props.currentUUID, name: values.coffeename });
      setTimeout(() => {
        props.closeModal();
        setModalText(false);
        setConfirmLoading(false);
        form.resetFields();
      }, 300);
    } catch (e: unknown) {
      if (e instanceof ApiError) {
        console.log("Add new entry failed:", e);
        setConfirmLoading(false);
        setError(true);
        setModalText(e.body.detail);
      }
    }
  };

  const addCoffee = async (newCoffee: CoffeeSchema) => {
    const response = await CoffeesService.postCoffeeApiV1CoffeesPost(newCoffee);
    console.log(response);

    dispatch(addCoffeeId(response._id));
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    props.closeModal();
  };

  const submitForm = () => {
    form.submit();
  };

  return (
    <>
      <Modal
        title="Title"
        open={props.open}
        onOk={submitForm}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <AddForm form={form} handleOk={handleOk} />
        {modalText && <p className={error ? "error" : ""}>{modalText}</p>}
      </Modal>
    </>
  );
};
export default AddModal;
