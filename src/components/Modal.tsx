import React from "react";
import { Modal, Button, Form } from "antd";
import AddForm from "./Form";
import { Coffee as CoffeeSchema } from "../../../src/client";
import { uuidv7 } from "uuidv7";

interface Props {
  addCoffee: (coffeeName: CoffeeSchema) => void;
  editCoffee: boolean;
}

const AddModal: React.FC<Props> = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [coffee_id, setCoffeeId] = React.useState<string>("");
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string | boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalText("Thanks, your input is getting stored");
      setConfirmLoading(true);
      const values = await form.validateFields();
      console.log(values);

      props.addCoffee({ _id: coffee_id, name: values.coffeename });
      setTimeout(() => {
        setVisible(false);
        setModalText(false);
        setConfirmLoading(false);
        form.resetFields();
      }, 300);
    } catch (e) {
      console.log("Add new entry failed:", e);
    }
  };

  const showModal = () => {
    setCoffeeId(uuidv7());
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const submitForm = () => {
    form.submit();
  };

  return (
    <>
      <Button type="primary" onClick={showModal} disabled={props.editCoffee}>
        Add
      </Button>
      <Modal
        title="Title"
        open={visible}
        onOk={submitForm}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <AddForm form={form} handleOk={handleOk} />
        {modalText && <p>{modalText}</p>}
      </Modal>
    </>
  );
};
export default AddModal;
