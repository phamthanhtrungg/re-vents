import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { Grid, Segment, Header, Card } from "semantic-ui-react";
import PersonCard from "./person-card";

const PeopleDashboard = () => {
  const auth = useSelector((state) => state.firebase.auth);
  useFirestoreConnect([
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "followings" }],
      storeAs: "followings",
    },
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "followers" }],
      storeAs: "followers",
    },
  ]);

  const { followings, followers } = useSelector(
    (state) => state.firestore.ordered
  );
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={8} stackable>
            {followings &&
              followings.map((following) => (
                <PersonCard key={following.id} user={following} />
              ))}
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followers.map((follower) => (
                <PersonCard key={follower.id} user={follower} />
              ))}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default PeopleDashboard;
