/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Divider,
  Form,
  Header,
  Segment,
  Message,
} from "semantic-ui-react";
import { useFirebase } from "react-redux-firebase";
import { toastr } from "react-redux-toastr";

import PlaceInput from "../../../../app/common/form/place-input";
import RadioInput from "../../../../app/common/form/radio-input";
import SelectInput from "../../../../app/common/form/select-input";
import TextInput from "../../../../app/common/form/text-input";
import TextArea from "../../../../app/common/form/text-area";
import { useSelector } from "react-redux";
import { isEmpty } from "lodash";

const interests = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" },
];

const About = () => {
  const user = useSelector((state) => state.firebase.profile);
  const {
    register,
    setValue,
    setError,
    handleSubmit,
    watch,
    formState,
    trigger,
    errors,
  } = useForm({
    defaultValues: {
      interests: [],
      origin: "",
      ...user,
    },
  });

  useEffect(() => {
    register({ name: "interests" });
    register({ name: "origin" });
  }, []);

  useEffect(() => {
    if (!isEmpty(user)) {
      setValue("status", user?.status);
      setValue("about", user?.about);
      setValue("interests", user?.interests || []);
      setValue("occupation", user?.occupation);
      setValue("origin", user?.origin);
    }
  }, [user]);

  const firebase = useFirebase();

  const handleUpdateAboutInfo = async (data) => {
    const userInfo = { ...data };
    try {
      await firebase.updateProfile(userInfo);
      toastr.success("Success", "Profile successfully updated");
    } catch (err) {
      setError("general", { message: err.message });
    }
  };

  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit(handleUpdateAboutInfo)}>
        <Form.Group inline>
          <label>Tell us your status: </label>
          <RadioInput
            name="status"
            type="radio"
            value="single"
            label="Single"
            register={register}
          />
          <RadioInput
            name="status"
            type="radio"
            value="relationship"
            label="Relationship"
            register={register}
          />
          <RadioInput
            name="status"
            type="radio"
            value="married"
            label="Married"
            register={register}
          />
        </Form.Group>
        <Divider />
        <label>Tell us about yourself</label>
        <TextArea
          style={{ marginTop: "1rem" }}
          rows={5}
          name="about"
          placeholder="About Me"
          register={register}
        />
        <SelectInput
          style={{ marginTop: "1rem" }}
          name="interests"
          options={interests}
          multiple={true}
          placeholder="Select your interests"
          setValue={setValue}
          triggerValidation={trigger}
          value={watch("interests")}
        />
        <TextInput
          name="occupation"
          type="text"
          placeholder="Occupation"
          register={register}
        />
        <PlaceInput
          value={watch("origin")}
          name="origin"
          placeholder="Country of Origin"
          setValue={setValue}
        />
        <Divider />

        {errors?.general?.message && (
          <Message error list={[errors?.general?.message]} />
        )}

        <Button
          size="large"
          positive
          content="Update Profile"
          type="submit"
          loading={formState.isSubmitting}
        />
      </Form>
    </Segment>
  );
};

export default About;
