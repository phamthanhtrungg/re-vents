import React from "react";
import { useForm } from "react-hook-form";
import { Form, Segment, Button } from "semantic-ui-react";
import TextInput from "../../../app/common/form/text-input";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const handleRegister = (data) => {
    console.log(data);
  };
  return (
    <Form error size="large" onSubmit={handleSubmit(handleRegister)}>
      <Segment>
        <TextInput
          name="displayName"
          type="text"
          placeholder="Know As"
          register={register({
            required: { message: "Required", value: true },
          })}
        />
        <TextInput
          name="email"
          type="email"
          placeholder="Email"
          register={register({
            required: { message: "Required", value: true },
          })}
        />{" "}
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          register={register({
            required: { message: "Required", value: true },
          })}
        />
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default RegisterForm;
