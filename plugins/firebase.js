// import { from } from "core-js/core/array";
import { initializeApp, getApps } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// const firebaseConfig = {
//     apiKey: "AIzaSyCoXfS6KAQBUTn_jrKuR97LoXZhbI_49y8",
//     authDomain: "logapp-b6cfc.firebaseapp.com",
//     projectId: "logapp-b6cfc",
//     storageBucket: "logapp-b6cfc.appspot.com",
//     messagingSenderId: "169012847205",
//     appId: "1:169012847205:web:9e5c330380a1dc344a9c8c"
//   };
const firebaseConfig = {
  apiKey: "AIzaSyB4js4abxZaJONIeGTX_lGKkM-ggaY7vok",
  authDomain: "logger-48543.firebaseapp.com",
  projectId: "logger-48543",
  storageBucket: "logger-48543.appspot.com",
  messagingSenderId: "687444015367",
  appId: "1:687444015367:web:6a45f43ff7febb31f9eda2"
};

  const apps=getApps();
  const app=!apps.length ? initializeApp(firebaseConfig) : apps[0];


  export const messaging= getMessaging(app);