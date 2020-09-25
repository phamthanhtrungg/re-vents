import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";
import LazyLoad from "react-lazyload";
import LoadingComponent from "../../../app/layout/loading";
import { useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

function UserDetailedPage({ match }) {
  const uid = match.params.id;
  const { auth } = useSelector((state) => state.firebase);

  useFirestoreConnect(() => {
    if (uid && uid !== auth.uid) {
      return [
        {
          collection: "users",
          doc: uid,
          storeAs: "profiles",
        },
        {
          collection: "users",
          doc: uid,
          subcollections: [{ collection: "photos" }],
          storeAs: "photos",
        },
      ];
    }
    return [
      {
        collection: "users",
        doc: auth.uid,
        storeAs: "profiles",
      },
      {
        collection: "users",
        doc: auth.uid,
        subcollections: [{ collection: "photos" }],
        storeAs: "photos",
      },
    ];
  });
  const photos = useSelector((state) => state.firestore.ordered.photos);
  const profile = useSelector(
    (state) =>
      state.firestore.ordered.profiles && state.firestore.ordered.profiles[0]
  );
  return !profile ? (
    <LoadingComponent />
  ) : (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size="small"
                src={
                  profile.photoURL ||
                  process.env.PUBLIC_URL + "/assets/user.png"
                }
              />
              <Item.Content verticalAlign="bottom">
                <Header as="h1">{profile.displayName}</Header>
                <br />
                <Header as="h3">{profile.occupation}</Header>
                <br />
                <Header as="h3">
                  {profile.dateOfBirth
                    ? moment().diff(
                        moment(profile.dateOfBirth.toDate()),
                        "years"
                      )
                    : "Unknown age"}{" "}
                  year old , Lives in {profile.origin}
                </Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width={uid === auth.uid ? 12 : 16}>
        <Segment>
          <Grid columns={2}>
            <Grid.Column width={10}>
              <Header icon="smile" content="About Display Name" />
              <p>
                I am a: <strong>{profile.occupation || "Unknown"}</strong>
              </p>
              <p>
                Originally from <strong>{profile.origin || "Unknown"}</strong>
              </p>
              <p>
                Member Since:{" "}
                <strong>
                  {new Date(profile.createdAt.toDate()).toDateString()}
                </strong>
              </p>
              <p>{profile.description}</p>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header icon="heart outline" content="Interests" />
              {profile.interest ? (
                <List>
                  {profile.interests &&
                    profile.interests.map((interest, i) => (
                      <Item key={interest + i}>
                        <Icon name="heart" />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    ))}
                </List>
              ) : (
                <p>No interests</p>
              )}
            </Grid.Column>
          </Grid>
        </Segment>
      </Grid.Column>

      {uid === auth.uid && (
        <Grid.Column width={4}>
          <Segment>
            <Button
              as={Link}
              to="/settings"
              color="teal"
              fluid
              basic
              content="Edit Profile"
            />
          </Segment>
        </Grid.Column>
      )}
      {photos && photos.length && (
        <Grid.Column width={uid === auth.uid ? 12 : 16}>
          <Segment attached>
            <Header icon="image" content="Photos" />
            <Image.Group size="small">
              {photos.map((photo) => (
                <LazyLoad
                  style={{ width: "auto" }}
                  key={photo.id}
                  height={400}
                  placeholder={
                    <Image
                      rounded
                      src={process.env.PUBLIC_URL + "/assets/user.png"}
                      alt=""
                    />
                  }
                >
                  <Image src={photo.url} alt="" />
                </LazyLoad>
              ))}
            </Image.Group>
          </Segment>
        </Grid.Column>
      )}

      <Grid.Column width={uid === auth.uid ? 12 : 16}>
        <Segment attached>
          <Header icon="calendar" content="Events" />
          <Menu secondary pointing>
            <Menu.Item name="All Events" active />
            <Menu.Item name="Past Events" />
            <Menu.Item name="Future Events" />
            <Menu.Item name="Events Hosted" />
          </Menu>

          <Card.Group itemsPerRow={5}>
            <Card>
              <Image src={"/assets/categoryImages/drinks.jpg"} />
              <Card.Content>
                <Card.Header textAlign="center">Event Title</Card.Header>
                <Card.Meta textAlign="center">
                  28th March 2018 at 10:00 PM
                </Card.Meta>
              </Card.Content>
            </Card>

            <Card>
              <Image src={"/assets/categoryImages/drinks.jpg"} />
              <Card.Content>
                <Card.Header textAlign="center">Event Title</Card.Header>
                <Card.Meta textAlign="center">
                  28th March 2018 at 10:00 PM
                </Card.Meta>
              </Card.Content>
            </Card>
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default UserDetailedPage;
