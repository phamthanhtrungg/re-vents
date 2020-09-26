import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import {
  Button,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Segment,
} from "semantic-ui-react";
import LazyLoad from "react-lazyload";
import LoadingComponent from "../../../app/layout/loading";
import { useFirestore, useFirestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import UserEvents from "./user-events";
import { toastr } from "react-redux-toastr";
import { isEmpty } from "lodash";

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
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "followings", doc: uid }],
          storeAs: "followings",
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
      {
        collection: "users",
        doc: auth.uid,
        subcollections: [{ collection: "followings", doc: uid }],
        storeAs: "followings",
      },
    ];
  });

  const photos = useSelector((state) => state.firestore.ordered.photos);
  const profile = useSelector(
    (state) =>
      state.firestore.ordered.profiles && state.firestore.ordered.profiles[0]
  );
  const followings = useSelector((state) => state.firestore.ordered.followings);
  const isFollowing = !isEmpty(followings);
  const firestore = useFirestore();

  const followerProfile = useSelector((state) => state.firebase.profile);

  const followUser = async (userToFollow) => {
    const following = {
      photoURL:
        userToFollow.photoURL || process.env.PUBLIC_URL + "/assets/user.png",
      city: userToFollow.city || "Unknown city",
      displayName: userToFollow.displayName,
    };

    const follower = {
      displayName: followerProfile.displayName,
      photoURL:
        followerProfile.photoURL || process.env.PUBLIC_URL + "/assets/user.png",
      city: followerProfile.city || "Unknown city",
    };

    try {
      await firestore.set(
        {
          collection: "users",
          doc: auth.uid,
          subcollections: [{ collection: "followings", doc: userToFollow.id }],
        },
        following
      );

      await firestore
        .collection("users")
        .doc(userToFollow.id)
        .collection("followers")
        .doc(auth.uid)
        .set(follower);

      toastr.success("Success", "You have followed this person");
    } catch (err) {
      console.log(err);
      toastr.error("Oops", "Something wrong happened");
    }
  };

  const unFollower = async (userToFollow) => {
    try {
      await firestore.delete({
        collection: "users",
        doc: auth.uid,
        subcollections: [{ collection: "followings", doc: userToFollow.id }],
      });

      await firestore
        .collection("users")
        .doc(userToFollow.id)
        .collection("followers")
        .doc(auth.uid)
        .delete();

      toastr.success("Success", "You have un-followed this person");
    } catch (err) {
      console.log(err);
      toastr.error("Oops", "Something wrong happened");
    }
  };

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
                    : "Unknown"}{" "}
                  year old , Lives in {profile.city || "Unknown"}
                </Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Grid.Column>
      <Grid.Column width={12}>
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

      {uid === auth.uid ? (
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
      ) : !isFollowing ? (
        <Grid.Column width={4}>
          <Segment>
            <Button
              color="teal"
              fluid
              basic
              content="Follow User"
              onClick={() => followUser(profile)}
            />
          </Segment>
        </Grid.Column>
      ) : (
        <Grid.Column width={4}>
          <Segment>
            <Button
              color="teal"
              fluid
              basic
              content="UnFollow User"
              onClick={() => unFollower(profile)}
            />
          </Segment>
        </Grid.Column>
      )}
      {photos && photos.length > 0 && (
        <Grid.Column width={12}>
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
      <UserEvents uid={uid} />
    </Grid>
  );
}

export default UserDetailedPage;
