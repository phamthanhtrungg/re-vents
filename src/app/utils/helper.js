import moment from "moment";

export const createNewEvent = (user, photoURL, event) => {
  delete event.id;
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

export const createDataTree = (dataset) => {
  let hashTable = Object.create(null);
  dataset.forEach((a) => (hashTable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach((a) => {
    if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
    else dataTree.push(hashTable[a.id]);
  });
  return dataTree;
};
