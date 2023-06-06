import { initializeApp } from "firebase/app";
import { getDatabase, ref, serverTimestamp } from "firebase/database";
import { getStorage } from "firebase/storage";

// Thay thế với thông tin cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyA0qVlJqqcrFThyDyHSSIqonBRAKIuqoC0",
  authDomain: "jolie-house.firebaseapp.com",
  projectId: "jolie-house",
  storageBucket: "jolie-house.appspot.com",
  messagingSenderId: "219598516018",
  appId: "1:219598516018:web:e9201c42e2cb2f359db12b",
  measurementId: "G-3M74MJ2DW4",
  databaseURL:
    "https://jolie-house-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);

export { database, ref, serverTimestamp, storage };
