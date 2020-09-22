import React from "react";
import { useForm } from "react-hook-form";
import { Form, Segment, Button } from "semantic-ui-react";
import TextInput from "../../../app/common/form/text-input";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const handleLogIn = (data) => {
    console.log(data);
  };
  return (
    <Form error size="large" onSubmit={handleSubmit(handleLogIn)}>
      <Segment>
        <TextInput
          name="email"
          type="text"
          placeholder="Email Address"
          register={register({
            required: { message: "Required", value: true },
          })}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="password"
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

export default LoginForm;
