import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./app/layout/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store/store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "./app/config/firebase";

import ReduxToastr from "react-redux-toastr";
import ScrollToTop from "./app/utils/scroll-to-top";
import "semantic-ui-css/semantic.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  firebaseStateName: "firebase",
  useFirestoreForProfile: true,
  profileFactory: (userData, profileData, firebase) => {
    const { displayName } = userData;
    const { email, avatarUrl } = profileData;

    return {
      displayName,
      email,
      photoURL: avatarUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
  },
};

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <HashRouter>
        <ScrollToTop>
          <ReduxToastr
            timeOut={4000}
            position="top-right"
            transitionIn="fadeIn"
            transitionOut="fadeOut"
          />
          <App />
        </ScrollToTop>
      </HashRouter>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
