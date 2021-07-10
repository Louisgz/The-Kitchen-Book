import firebase from "firebase/app";
import "firebase/firestore";
import "@firebase/storage";
import "@firebase/messaging";

export default class Fire {
  // Initialize Firebase
  static init() {
    if (firebase.apps.length) return;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const cfg = require("../keys/firebase");
    firebase.initializeApp(cfg.default);
  }

  // Retrieve base firestore
  static store() {
    return firebase.firestore();
  }

  // Retrieve base messaging
  static messaging() {
    return firebase.messaging();
  }

  // Retrieve batch
  static batch() {
    return Fire.store().batch();
  }

  // Retrieve base auth
  static auth() {
    return firebase.auth();
  }

  // Retrieve base storage
  static storage() {
    return firebase.storage();
  }

  // Reauth
  static async reauthEmail(email: any, password: any) {
    const user = Fire.auth().currentUser;
    if (!user) return null;
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password
    );
    return user.reauthenticateWithCredential(credential);
  }

  // Upload a file to Storage
  static async uploadFile(location: any, uri: any) {
    // Retrieve Blob
    const res = await fetch(uri);
    const blob = await res.blob();
    // Send it to Firebase Storage
    const store = Fire.storage().ref();
    const ref = store.child(location);
    const uploaded = await ref.put(blob);
    // Retrieve persistent URL
    return await uploaded.ref.getDownloadURL();
  }

  // Shortcuts
  static async doc(ref: any) {
    const doc: any = await ref.get();
    if (!doc.exists) return null;
    return {
      id: doc.id,
      ...doc.data(),
    };
  }
  static async list(ref: any) {
    const arr: any[] = [];
    const snap = await ref.get();
    snap.forEach((doc: any) => {
      if (!doc.exists) return null;
      arr.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return arr;
  }

  // Shortcuts

  static set(collection: any, id: any, data: any) {
    return Fire.store().collection(collection).doc(id).set(data);
  }
  static update(collection: any, id: any, data: any) {
    return Fire.store().collection(collection).doc(id).update(data);
  }
}
