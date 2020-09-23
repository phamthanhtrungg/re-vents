export const sampleData = {
  events: [
    {
      id: "1",
      title: "Trip to Tower of London",
      date: "2018-03-27",
      category: "culture",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
      venueLatLng: {
        lat: 51.5111,
        lng: -0.12533,
      },
      venue: "Tower of London, St Katharine's & Wapping, London",
      hostedBy: "Bob",
      hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      attendees: [
        {
          id: "a",
          name: "Bob",
          photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
        },
        {
          id: "b",
          name: "Tom",
          photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
        },
      ],
    },
    {
      id: "2",
      title: "Trip to Punch and Judy Pub",
      date: "2018-03-28",
      category: "drinks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
      venue: "Punch & Judy, Henrietta Street, London, UK",
      venueLatLng: {
        lat: 51.5111,
        lng: -0.12533,
      },
      hostedBy: "Tom",
      hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      attendees: [
        {
          id: "b",
          name: "Tom",
          photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
        },
        {
          id: "a",
          name: "Bob",
          photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
        },
      ],
    },
  ],
};
