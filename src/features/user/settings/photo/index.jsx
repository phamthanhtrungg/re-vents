import React, { useRef, useState } from "react";
import {
  Image,
  Segment,
  Header,
  Divider,
  Grid,
  Button,
  Card,
  Icon,
} from "semantic-ui-react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-cropper";
import {
  useFirebase,
  useFirestore,
  useFirestoreConnect,
} from "react-redux-firebase";
import { toastr } from "react-redux-toastr";
import { useSelector } from "react-redux";

function PhotosPage() {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSettingMain, setIsSettingMain] = useState(false);
  const myCropper = useRef(null);
  const { auth, profile } = useSelector((state) => state.firebase);

  const firebase = useFirebase();
  const firestore = useFirestore();

  useFirestoreConnect([
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos",
    },
  ]);
  const photos = useSelector((state) => state.firestore.ordered.photos);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptFiles) => {
      setFiles(acceptFiles);
    },
    multiple: false,
    accept: "image/*",
  });

  const handleUploadProfileImage = async () => {
    setIsUploading(true);
    const user = firebase.auth().currentUser;
    const path = `${user.uid}/user_images`;
    const options = {
      name: files[0].name,
    };
    myCropper.current.getCroppedCanvas().toBlob(async (blob) => {
      try {
        //upload file to firebase storage
        const uploadedFile = await firebase.uploadFile(
          path,
          blob,
          null,
          options
        );

        //get downloable URL
        const downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();

        //if user dont have photoURL set them photoURL, else add new image to photos sub-collection
        const userDoc = await firestore.get(`users/${user.uid}`);
        if (!userDoc.data().photoURL) {
          await firebase.updateProfile({ photoURL: downloadURL });
          await user.updateProfile({ photoURL: downloadURL });
        }

        await firestore.add(
          {
            collection: "users",
            doc: user.uid,
            subcollections: [{ collection: "photos" }],
          },
          {
            name: files[0].name,
            url: downloadURL,
          }
        );
        setIsUploading(false);
        setFiles([]);
        toastr.success("Success", "Photo has been uploaded");
      } catch (err) {
        console.log(err);
        setIsUploading(false);
      }
    });
  };

  const handleDeleteImage = async (photo) => {
    const user = firebase.auth().currentUser;

    try {
      await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
      await firestore.delete({
        collection: "users",
        doc: user.uid,
        subcollections: [
          {
            collection: "photos",
            doc: photo.id,
          },
        ],
      });
      toastr.success("Success", "Photo deleted");
    } catch (err) {
      toastr.error("Failed", "Something failed");
      console.log(err);
    }
  };

  const handleSetMainImage = async (photo) => {
    setIsSettingMain(true);
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser;
    const userDocRef = firestore.collection("users").doc(user.uid);
    const eventAttendeeRef = firestore.collection("event_attendee");
    try {
      const batch = firestore.batch();

      batch.update(userDocRef, {
        photoURL: photo.url,
      });

      let eventQuery = eventAttendeeRef
        .where("userUid", "==", user.uid)
        .where("eventDate", ">", new Date());

      let eventQuerySnap = await eventQuery.get();

      for (let i = 0; i < eventQuerySnap.docs.length; ++i) {
        let eventDocRef = firestore
          .collection("events")
          .doc(eventQuerySnap.docs[i].data().eventId);

        let event = await eventDocRef.get();

        if (event.data().hostUid === user.uid) {
          batch.update(eventDocRef, {
            hostPhotoURL: photo.url,
            [`attendees.${user.uid}.photoURL`]: photo.url,
          });
        } else {
          batch.update(eventDocRef, {
            [`attendees.${user.uid}.photoURL`]: photo.url,
          });
        }
      }

      await batch.commit();
      setIsSettingMain(false);

      toastr.success("Success", "Main photo updated");
    } catch (err) {
      setIsSettingMain(false);
      toastr.error("Failed", "Something failed");

      console.log(err);
    }
  };

  return (
    <Segment>
      <Header dividing size="large" content="Your Photos" />
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Header color="teal" sub content="Step 1 - Add Photo" />
            <div {...getRootProps()} className="dropzone-wrapper">
              <input {...getInputProps()} />
              <Icon name="upload" size="big" />
              <span>Drop image here or click to add</span>
            </div>
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 2 - Resize image" />
            {files[0] && (
              <Cropper
                src={files[0] && URL.createObjectURL(files[0])}
                style={{ height: 200, width: "100%" }}
                initialAspectRatio={1}
                preview=".img-preview"
                viewMode={1}
                guides={true}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={false}
                responsive={true}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(cropper) => (myCropper.current = cropper)}
              />
            )}
          </Grid.Column>
          <Grid.Column width={1} />
          <Grid.Column width={4}>
            <Header sub color="teal" content="Step 3 - Preview and Upload" />
            {files[0] && (
              <div
                style={{
                  width: "200px",
                  height: "200px ",
                }}
              >
                <div
                  className="img-preview"
                  style={{
                    width: "200px",
                    height: "200px ",
                    overflow: "hidden",
                  }}
                />
              </div>
            )}

            {files[0] && (
              <Button.Group style={{ width: "100%" }}>
                <Button
                  style={{ width: "50%" }}
                  onClick={handleUploadProfileImage}
                  positive
                  icon="check"
                  disabled={isUploading}
                  loading={isUploading}
                ></Button>
                <Button
                  style={{ width: "50%" }}
                  icon="close"
                  disabled={isUploading}
                  onClick={() => {
                    setFiles([]);
                  }}
                ></Button>
              </Button.Group>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
      <Header sub color="teal" content="All Photos" />

      <Card.Group itemsPerRow={4}>
        <Card style={{ display: "flex", flexDirection: "column" }}>
          <Image
            src={profile.photoURL}
            alt=""
            style={{ minHeight: 150, flex: 1 }}
          />
          <Button positive>Main Photo</Button>
        </Card>
        {photos &&
          photos.map((photo) => {
            return (
              <Card
                key={photo.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Image
                  src={photo.url}
                  alt="No image"
                  style={{ minHeight: 150, flex: 1 }}
                />
                <div className="ui two buttons">
                  <Button
                    basic
                    color="green"
                    loading={isSettingMain}
                    onClick={() => {
                      handleSetMainImage(photo);
                    }}
                  >
                    Main
                  </Button>
                  <Button
                    basic
                    icon="trash"
                    color="red"
                    disabled={isSettingMain}
                    onClick={() => {
                      handleDeleteImage(photo);
                    }}
                  />
                </div>
              </Card>
            );
          })}
      </Card.Group>
    </Segment>
  );
}

export default PhotosPage;
