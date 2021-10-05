import { createActionThunk } from "redux-thunk-actions";
import { handleActions } from "redux-actions";

import { Fire, Mail } from "../services";

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(document.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

export const autologin = createActionThunk("AUTOLOGIN", (user) => user);
export const saveOffer = createActionThunk("SAVE_OFFER", (offer) => offer);
export const saveInfo = createActionThunk("SAVE_REGISTER_NAME", (name) => name);
export const finishLogin = createActionThunk(
  "FINISH_REGISTER",
  async (language, { getState }) => {
    const reducer = getState().authReducer;
    const { email, uid, phoneNumber, displayName, providerData } =
      reducer.fireUser;

    const infoData = {
      id: uid,
      email: email,
      createdAt: new Date(),
      ...reducer.savedInfo,
    };

    const isGoogle = providerData[0].providerId === "google.com";
    const isFacebook = providerData[0].providerId === "facebook.com";
    if (isGoogle || isFacebook) {
      const fullName = displayName.split(" ");
      infoData.last_name = (isGoogle ? fullName[0] : fullName[1]) || "";
      infoData.first_name = (isGoogle ? fullName[1] : fullName[0]) || "";
      infoData.phone = phoneNumber || "Non renseigné";
      infoData.vip = false;
      infoData.source = {
        utm_source: getParameterByName("utm_source"),
        utm_medium: getParameterByName("utm_medium"),
        utm_campaign: getParameterByName("utm_campaign"),
        utm_term: getParameterByName("utm_term"),
        utm_content: getParameterByName("utm_content"),
      };
    }

    const info = await retrieveOrCreate("users", uid, infoData, language);
    return {
      id: uid,
      ...info,
    };
  }
);

export const refreshUser = createActionThunk(
  "UPDATE_USER",
  async (info, { getState }) => {
    const user = getState().authReducer.user;
    return {
      ...user,
      ...info,
    };
  }
);

export const updateUser = createActionThunk(
  "UPDATE_USER",
  async (info, { getState }) => {
    const user = getState().authReducer.user;
    await Fire.store().collection("users").doc(user.id).update(info);
    return {
      ...user,
      ...info,
    };
  }
);

export const logout = createActionThunk("AUTOLOGIN", async () => {
  await Fire.auth().signOut();
  return null;
});

const initialState = {
  fireUser: null,
  savedInfo: null,
  savedOffer: null,

  user: null,
  updating: false,
  logging: false,
};

// Reducer
export const authReducer = handleActions(
  {
    UPDATE_USER_STARTED: (state, action) => ({
      ...state,
      updating: true,
    }),
    UPDATE_USER_SUCCEEDED: (state, action) => ({
      ...state,
      user: action.payload,
      updating: false,
    }),
    UPDATE_USER_FAILED: (state, action) => ({
      ...state,
      updating: false,
    }),

    FINISH_REGISTER_STARTED: (state, action) => ({
      ...state,
      logging: true,
    }),
    FINISH_REGISTER_SUCCEEDED: (state, action) => ({
      ...state,
      user: action.payload,
      logging: false,
    }),
    FINISH_REGISTER_FAILED: (state, action) => ({
      ...state,
      logging: false,
    }),

    AUTOLOGIN_SUCCEEDED: (state, action) => ({
      ...state,
      fireUser: action.payload,
      user: null,
    }),

    SAVE_OFFER_SUCCEEDED: (state, action) => ({
      ...state,
      savedOffer: action.payload,
    }),

    SAVE_REGISTER_NAME_SUCCEEDED: (state, action) => ({
      ...state,
      savedInfo: action.payload,
    }),
  },
  initialState
);
