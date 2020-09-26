import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import TextArea from "../../../app/common/form/text-area";
import { addEventComment } from "../event.action";

function EventDetailChat({ eventId }) {
  useFirebaseConnect(`event_chat/${eventId}`);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, errors, reset } = useForm({
    mode: "all",
  });

  const handleAddComment = (data) => {
    dispatch(addEventComment(eventId, data.comment));
    reset();
  };

  return (
    <div>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src={process.env.PUBLIC_URL + "/assets/user.png"} />
            <Comment.Content>
              <Comment.Author as="a">Matt</Comment.Author>
              <Comment.Metadata>
                <div>Today at 5:42PM</div>
              </Comment.Metadata>
              <Comment.Text>How artistic!</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
        <Form reply onSubmit={handleSubmit(handleAddComment)}>
          <TextArea
            error={errors?.comment?.message}
            name="comment"
            placeholder="Add your comment"
            register={register({
              required: { message: "Please enter your comment", value: true },
            })}
          />
          <Button
            content="Add Reply"
            labelPosition="left"
            icon="edit"
            primary
            disabled={!formState.isValid}
            loading={formState.isSubmitting}
          />
        </Form>
      </Segment>
    </div>
  );
}

export default EventDetailChat;
