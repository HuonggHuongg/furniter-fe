import React, { useState, useEffect } from "react";
import {
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  get,
  onValue,
  update,
} from "firebase/database";

import {  useObject } from "react-firebase-hooks/database";
import { database, serverTimestamp } from "../../../utils/firebase.js";
import "./chat.css";
import { useRef } from "react";

const useAdminMessages = (username) => {
    const [adminMessages, setAdminMessages] = useState([]);
    const [userMessages, setUserMessages] = useState([]);
    const messagesRef = ref(database, "messages");
  
    useEffect(() => {
      const adminMessagesRef = query(
        messagesRef,
        orderByChild("receiver"),
        equalTo(username)
      );
  
      const userMessagesRef = query(
        messagesRef,
        orderByChild("sender"),
        equalTo(username)
      );
  
      const adminMessagesListener = onValue(adminMessagesRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          messages.push({ key, ...data });
        });
        setAdminMessages(messages);
      });
  
      const userMessagesListener = onValue(userMessagesRef, (snapshot) => {
        const messages = [];
        snapshot.forEach((childSnapshot) => {
          const key = childSnapshot.key;
          const data = childSnapshot.val();
          messages.push({ key, ...data });
        });
        setUserMessages(messages);
      });
  
      return () => {
        // Clear the listener when unmounting
        adminMessagesListener();
        userMessagesListener();
      };
    }, [messagesRef, username]);
  
    return { userMessages, adminMessages };
  };
  
  export default useAdminMessages;