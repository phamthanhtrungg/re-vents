import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Segment, Button, Message } from "semantic-ui-react";
import TextInput from "../../../app/common/form/text-input";
import { registerUser } from "../auth.action";

const RegisterForm = () => {
  const { register, handleSubmit } = useForm();
  const { registerUserError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleRegister = (data) => {
    dispatch(registerUser(data));
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
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          register={register({
            required: { message: "Required", value: true },
          })}
        />
        {registerUserError && (
          <Message
            error
            header="Register failed"
            list={[registerUserError.message]}
          />
        )}
        <Button fluid size="large" color="teal">
          Register
        </Button>
      </Segment>
    </Form>
  );
};

export default RegisterForm;
