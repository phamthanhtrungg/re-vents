import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Segment, Button, Message } from "semantic-ui-react";
import TextInput from "../../../app/common/form/text-input";
import { login } from "../auth.action";

const LoginForm = () => {
  const { register, handleSubmit } = useForm();
  const { logInError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogIn = (data) => {
    dispatch(login(data));
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
          autoComplete="current-password"
          register={register({
            required: { message: "Required", value: true },
          })}
        />
        {logInError && (
          <Message error header="Log in failed" list={[logInError?.message]} />
        )}
        <Button fluid size="large" color="teal">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

export default LoginForm;
