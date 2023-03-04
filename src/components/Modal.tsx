import React from "react";
import { Modal, Button, Form } from "antd";
import AddForm from "./Form";

interface Props {
  addCoffee: (coffeeName: string) => void;
  editCoffee: boolean;
}



const AddModal: React.FC<Props>  = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState<string | boolean>(false);
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      setModalText("Thanks, your input is getting stored");
      setConfirmLoading(true);
      const values = await form.validateFields();
      console.log(values)
      props.addCoffee(values.coffeename);
      setTimeout(() => {
        setVisible(false);
        setModalText(false);
        setConfirmLoading(false);
        form.resetFields();
      }, 1000);
    } catch (e) {
      console.log("Add new entry failed:", e);
    }
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const submitForm = ()=>{
    form.submit()
  }

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
