import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useFirebaseConnect } from "react-redux-firebase";
import { Segment, Header, Comment, Form, Button } from "semantic-ui-react";
import moment from "moment";
import TextArea from "../../../app/common/form/text-area";
import { addEventComment } from "../event.action";
import { Link } from "react-router-dom";
import { createDataTree } from "../../../app/utils/helper";

const EventChatForm = ({ eventId, handleCloseReplyForm, parentId }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState, errors, reset } = useForm({
    mode: "all",
  });

  const handleAddComment = (comment) => {
    dispatch(addEventComment(eventId, comment, parentId));
    reset();
    if (parentId !== 0) {
      handleCloseReplyForm && handleCloseReplyForm();
    }
  };

  return (
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
  );
};

function EventDetailChat({ eventId }) {
  useFirebaseConnect(`event_chat/${eventId}`);
  const chatTree = useSelector((state) =>
    createDataTree(
      (state.firebase.data["event_chat"] &&
        state.firebase.data["event_chat"][eventId] &&
        Object.keys(state.firebase.data["event_chat"][eventId]).map(
          (chatId) => ({
            ...state.firebase.data["event_chat"][eventId][chatId],
            id: chatId,
          })
        )) ||
        []
    )
  );

  const [showReplayForm, setShowReplyForm] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleOpenReplyForm = (chatId) => {
    setShowReplyForm(true);
    setSelectedChatId(chatId);
  };

  const handleCloseReplyForm = () => {
    setShowReplyForm(false);
    setSelectedChatId(null);
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
          {chatTree &&
            chatTree.map((chat) => (
              <Comment key={chat.id}>
                <Comment.Avatar src={chat.photoURL} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${chat.uid}`}>
                    {chat.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(chat.date).fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>{chat.text}</Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() => handleOpenReplyForm(chat.id)}
                    >
                      Reply
                    </Comment.Action>
                    {showReplayForm && selectedChatId === chat.id && (
                      <EventChatForm
                        eventId={eventId}
                        handleCloseReplyForm={handleCloseReplyForm}
                        parentId={chat.id}
                      />
                    )}
                  </Comment.Actions>
                </Comment.Content>
                {chat.childNodes &&
                  chat.childNodes.map((child) => (
                    <Comment.Group key={child.id}>
                      <Comment>
                        <Comment.Avatar src={chat.photoURL} />
                        <Comment.Content>
                          <Comment.Author
                            as={Link}
                            to={`/profile/${child.uid}`}
                          >
                            {child.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>{moment(child.date).fromNow()}</div>
                          </Comment.Metadata>
                          <Comment.Text>{child.text}</Comment.Text>
                        </Comment.Content>
                      </Comment>
                    </Comment.Group>
                  ))}
              </Comment>
            ))}
        </Comment.Group>
        <EventChatForm parentId={0} eventId={eventId} />
      </Segment>
    </div>
  );
}

export default EventDetailChat;
