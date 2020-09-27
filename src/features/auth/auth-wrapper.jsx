import { connectedReduxRedirect } from "redux-auth-wrapper/history4/redirect";
import { openModal } from "../modal/modal.action";

export const userIsAuthenticated = connectedReduxRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  redirectPath: "/events",
  redirectAction: () => (dispatch) => {
    dispatch(
      openModal({
        modalType: "UnAuthModal",
      })
    );
  },
});
