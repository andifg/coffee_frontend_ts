import React from "react";
import { Form, Input, Rate } from "antd";

const AddForm = (props) => {

  const checkCoffeeName = (_, value) => {
    if (!value) {
      return Promise.reject("Please enter a valid name!");
    }
    return Promise.resolve();
  };

  const checkRate = (_, value) => {
    if (!value){
      return Promise.reject("Please enter a rating");
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
        rules={[
          {
            validator: checkRate,
          }
        ]}
      >
        <Rate />
      </Form.Item>
    </Form>
  );
};

export default AddForm;
