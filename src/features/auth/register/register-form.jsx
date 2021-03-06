import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Form, Segment, Button, Message, Divider } from "semantic-ui-react";
import TextInput from "../../../app/common/form/text-input";
import { registerUser } from "../auth.action";
import SocialLogin from "../social-login";

const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });
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
            minLength: { message: "At lease 6 characters", value: 6 },
          })}
        />
        {registerUserError && (
          <Message
            error
            header="Register failed"
            list={[registerUserError.message]}
          />
        )}
        <Button
          fluid
          size="large"
          color="teal"
          disabled={!formState.isValid || formState.isSubmitting}
          loading={formState.isSubmitting}
        >
          Register
        </Button>
        <Divider content="Or" horizontal />
        <SocialLogin />
      </Segment>
    </Form>
  );
};

export default RegisterForm;
