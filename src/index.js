import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./app/layout/app";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/store/store";
import { loadEvents } from "./features/event/event.action";

import ReduxToastr from "react-redux-toastr";
import ScrollToTop from "./app/utils/scroll-to-top";
import "semantic-ui-css/semantic.min.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
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
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
