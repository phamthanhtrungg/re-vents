/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  Segment,
  Form,
  Header,
  Divider,
  Button,
  Message,
} from "semantic-ui-react";
import moment from "moment";
import { useFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

import DateInputPicker from "../../../../app/common/form/date-picker";
import PlaceInput from "../../../../app/common/form/place-input";
import RadioInput from "../../../../app/common/form/radio-input";
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
    watch,
    setError,
  } = useForm({
    mode: "all",
    defaultValues: { ...user, dateOfBirth: user?.dateOfBirth?.toDate() },
  });

  useEffect(() => {
    register({ name: "dateOfBirth" });
    register({ name: "city" });
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isEmpty(user) && mounted) {
      setValue("displayName", user.displayName);
      setValue("city", user?.city || "");
      setValue(
        "dateOfBirth",
        user?.dateOfBirth ? user.dateOfBirth.toDate() : ""
      );
      setValue("gender", user.gender || "");
    }
  }, [user]);

  const firebase = useFirebase();
  const handleUpdateUserProfile = async (data) => {
    const userInfo = { ...data };
    if (userInfo.dateOfBirth) {
      userInfo.dateOfBirth = new Date(userInfo.dateOfBirth);
    }
    try {
      await firebase.updateProfile(userInfo);
      toastr.success("Success", "Profile successfully updated");
    } catch (err) {
      setError("general", { message: err.message });
    }
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
        <Form.Group inline>
          <label>Gender:</label>
          <RadioInput
            type="radio"
            name="gender"
            value="male"
            label="Male"
            register={register}
          />
          <RadioInput
            type="radio"
            value="female"
            name="gender"
            label="Female"
            register={register}
          />
        </Form.Group>
        <DateInputPicker
          width={8}
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={watch("dateOfBirth")}
          setValue={setValue}
          triggerValidation={trigger}
          showMonthDropdown={true}
          showYearDropdown={true}
          dateFormat="yyyy-MM-dd"
          maxDate={moment().subtract(18, "years")}
        />
        <PlaceInput
          name="city"
          placeholder="Home Town"
          setValue={setValue}
          value={getValues("city") || ""}
        />
        {errors?.general?.message && (
          <Message error list={[errors?.general?.message]} />
        )}
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
