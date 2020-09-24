import moment from "moment";

export const createNewEvent = (user, photoURL, event) => {
  event.date = moment(event.date).toDate();

  return {
    ...event,
    venueLatLng: {
      lat: event.lat,
      lng: event.lng,
    },
    hostUid: user.uid,
    hostPhotoURL: photoURL || process.env.PUBLIC_URL + "/assets/user.png",
    hostedBy: user.displayName,
    created: Date.now(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: Date.now(),
        photoURL: photoURL || process.env.PUBLIC_URL + "/assets/user.png",
        displayName: user.displayName,
        host: true,
      },
    },
  };
};
