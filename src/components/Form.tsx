import React from "react";
import { Form, Input, Rate } from "antd";
import { FormInstance, Rule } from 'antd/es/form';


interface Props {
  form: FormInstance;
  handleOk: () => void;

}


const AddForm: React.FC<Props> = (props) => {

  const checkCoffeeName = (_: Rule, value: string) => {
    if (!value) {
      return Promise.reject("Please enter a valid name!");
    }
    return Promise.resolve();
  };

  return (
    <Form
      form={props.form}
      name="basic"
      onFinish={props.handleOk}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Coffee Name"
        name="coffeename"
        hasFeedback
        rules={[
          {
            validator: checkCoffeeName,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="rate"
        label="Rate"
      >
        <Rate />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
