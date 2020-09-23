import React from "react";
import { useForm } from "react-hook-form";
import {
  Segment,
  Header,
  Form,
  Divider,
  Button,
  Icon,
  Message,
} from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers";
import { toastr } from "react-redux-toastr";
import * as yup from "yup";

import TextInput from "../../../../app/common/form/text-input";
import { useFirebase } from "react-redux-firebase";
import { useSelector } from "react-redux";

const schema = yup.object().shape({
  password: yup.string().min(6).required("Please enter password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const Account = () => {
  const {
    register,
    errors,
    handleSubmit,
    formState,
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const provider = useSelector(
    (state) => state.firebase.auth.providerData[0].providerId
  );
  const firebase = useFirebase();

  const updatePassword = async (data) => {
    try {
      await firebase.auth().currentUser.updatePassword(data.password);
      reset();
      toastr.success("Success", "Your password has beed updated!");
    } catch (err) {
      setError("general", { message: err.message });
    }
  };

  return (
    <Segment>
      <Header dividing size="large" content="Account" />
      {provider === "password" && (
        <div>
          <Header color="teal" sub content="Change password" />
          <p>Use this form to update your account settings</p>
          <Form onSubmit={handleSubmit(updatePassword)}>
            <TextInput
              name="password"
              type="password"
              pointing="left"
              placeholder="New Password"
              register={register({
                required: { message: "Required", value: true },
              })}
              error={errors?.password?.message}
              autoComplete="new-password"
            />
            <TextInput
              name="confirmPassword"
              type="password"
              pointing="left"
              placeholder="Confirm Password"
              register={register({
                required: { message: "Required", value: true },
              })}
              error={errors?.confirmPassword?.message}
              autoComplete="new-password"
            />
            {errors?.general?.message ?? (
              <Message
                style={{ color: "red" }}
                error
                header="Update password failed"
                list={[errors?.general?.message]}
              />
            )}
            <Divider />
            <Button
              disabled={!formState.isValid || formState.isSubmitting}
              size="large"
              positive
              content="Update Password"
              type="submit"
              loading={formState.isSubmitting}
            />
          </Form>
        </div>
      )}

      <Segment>
        {provider === "facebook.com" && (
          <>
            <Header color="teal" sub content="Facebook Account" />
            <p>Please visit Facebook to update your account settings</p>
            <Button type="button" color="facebook">
              <Icon name="facebook" />
              Go to Facebook
            </Button>
          </>
        )}
        {provider === "google.com" && (
          <>
            <Header color="teal" sub content="Google Account" />
            <p>Please visit Google to update your account settings</p>
            <Button type="button" color="google plus">
              <Icon name="google plus" />
              Go to Google
            </Button>
          </>
        )}
      </Segment>
    </Segment>
  );
};

export default Account;
