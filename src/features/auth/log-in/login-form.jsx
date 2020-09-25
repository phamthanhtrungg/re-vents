import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Segment, Button, Message, Divider } from "semantic-ui-react";
import TextInput from "../../../app/common/form/text-input";
import { login } from "../auth.action";
import SocialLogin from "../social-login";

const LoginForm = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });
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
          placeholder="Password"
          autoComplete="current-password"
          register={register({
            required: { message: "Required", value: true },
          })}
        />
        {logInError && (
          <Message error header="Log in failed" list={[logInError?.message]} />
        )}
        <Button
          fluid
          size="large"
          color="teal"
          disabled={!formState.isValid || formState.isSubmitting}
          loading={formState.isSubmitting}
        >
          Login
        </Button>
        <Divider content="Or" horizontal />
        <SocialLogin />
      </Segment>
    </Form>
  );
};

export default LoginForm;
