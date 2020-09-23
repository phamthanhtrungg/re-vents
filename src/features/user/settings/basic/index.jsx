/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Segment, Form, Header, Divider, Button } from "semantic-ui-react";
import DateInputPicker from "../../../../app/common/form/date-picker";
import PlaceInput from "../../../../app/common/form/place-input";
import TextInput from "../../../../app/common/form/text-input";

const Basics = (props) => {
  const [mounted, setMounted] = useState(false);
  const user = useSelector((state) => state.firebase.profile);
  const {
    register,
    formState,
    errors,
    setValue,
    trigger,
    getValues,
    handleSubmit,
  } = useForm({
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: { ...user },
  });

  useEffect(() => {
    register(
      { name: "dateOfBirth" },
      { required: { message: "Please choose a valid date", value: true } }
    );

    register(
      { name: "city" },
      { required: { message: "Please chose a valid city", value: "true" } }
    );
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEmpty(user) && mounted) {
      setValue("displayName", user.displayName);
      setValue("city", user?.city || "");
      setValue("dateOfBirth", user?.dateOfBirth || new Date());
    }
  }, [mounted, user]);

  const handleUpdateUserProfile = (data) => {
    console.log(data);
  };

  return (
    <Segment>
      <Header dividing size="large" content="Basics" />
      <Form onSubmit={handleSubmit(handleUpdateUserProfile)}>
        <TextInput
          name="displayName"
          type="text"
          placeholder="Known As"
          register={register({
            required: { message: "Please enter your name", value: true },
          })}
          error={errors?.displayName?.message}
        />
        <Form.Group inline>{/* todo: Gender Radio button */}</Form.Group>
        <DateInputPicker
          width={8}
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={getValues("dateOfBirth")}
          error={errors?.dateOfBirth?.message || ""}
          setValue={setValue}
          triggerValidation={trigger}
        />
        <PlaceInput
          name="city"
          placeholder="Home Town"
          setValue={setValue}
          error={errors?.city?.message}
          value={getValues("city") || ""}
        />
        <Divider />
        <Button
          size="large"
          positive
          content="Update Profile"
          loading={formState.isSubmitting}
        />
      </Form>
    </Segment>
  );
};

export default Basics;
