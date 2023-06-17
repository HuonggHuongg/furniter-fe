import React, { useState, useEffect } from "react";
import {
  ref,
  push,
  query,
  orderByChild,
  equalTo,
  getDatabase,
  get,
  onValue,
  onChildAdded,
  set,
  update,
} from "firebase/database";

import { useList, useObject } from "react-firebase-hooks/database";
import { database, serverTimestamp } from "../../../utils/firebase.js";
import "./chat.css";
import { useRef } from "react";

const useAdminMessages = (username) => {
  const [adminMessages, setAdminMessages] = useState([]);
  const [userMessages, setUserMessages] = useState([]);
  const messagesRef = ref(database, "messages");

  useEffect(() => {
    const db = getDatabase();
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
  }, [username]);

  return { userMessages, adminMessages };
};

const UserChat = ({ onHideDialog }) => {
  const messagesRef = ref(database, "messages");

  const [usernameSelected, setUsernameSelected] = useState();
  const user = JSON.parse(localStorage.getItem("currentUserInfor"))?.currentUser
    ?.userName;
  useState(() => {
    if (user) {
      setUsernameSelected(user);
    } else if (localStorage.getItem("userChat")) {
      setUsernameSelected(localStorage.getItem("userChat"));
    } else {
      const timestamp = Date.now();
      setUsernameSelected("guest-" + timestamp);
      localStorage.setItem("userChat", "guest-" + timestamp);
    }
  }, []);
  const [message, setMessage] = useState("");

  const { userMessages, adminMessages } = useAdminMessages(usernameSelected);
  const allMessages = [...userMessages, ...adminMessages];
  const sortedMessages = allMessages.sort((a, b) => a.timestamp - b.timestamp);

  const [usersSnapshot] = useObject(ref(database, "users"));
  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.trim() !== "") {
      const lastSendTime = usersSnapshot.val()[usernameSelected]?.lastSend;
      const newTimestamp = lastSendTime + 60 * 60 * 1000;
      const now = new Date().getTime();
      console.log(lastSendTime, newTimestamp, now);

      const newMessage = {
        text: message,
        sender: usernameSelected,
        receiver: "Admin",
        timestamp: serverTimestamp(),
      };
      push(ref(database, "messages"), newMessage);
      if (newTimestamp < now || !lastSendTime) {
        const autoReply = {
          text: "Thank you for contacting, your information has been recorded, we will respond as soon as possible!",
          sender: "Admin",
          receiver: usernameSelected,
          timestamp: serverTimestamp(),
        };
        push(ref(database, "messages"), autoReply);
      }
      setMessage("");
      const newUserPath = `users/` + usernameSelected;
      update(ref(database, newUserPath), {
        lastSend: serverTimestamp(),
        adminRead: true,
        lastMessage: message,
      });
    }
  };

  const messageListRef = useRef(null);

  useEffect(() => {
    // Cuộn xuống dưới sau khi component render
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current?.scrollHeight;
    }
  }, [sortedMessages]);

  useEffect(() => {
    if (usernameSelected.trim() !== "") {
      const usersRef = ref(database, "users");
      const userRef = query(usersRef, equalTo(usernameSelected));

      const db = getDatabase();
      get(userRef).then((snapshot) => {
        if (!snapshot.exists()) {
          const avatar =
            JSON.parse(localStorage.getItem("currentUserInfor"))?.currentUser
              ?.avatar || "";
          if (message.trim() !== "") {
            const newUserPath = `users/` + usernameSelected;
            update(ref(database, newUserPath), {
              avatar: avatar,
            });
          }
        }
      });
    }
  }, [message, usernameSelected]);

  return (
    <div style={{ zIndex: "999999" }}>
      <div class="chat-ui">
        <div class="chat-titlebar" onClick={onHideDialog}>
          <h5>Chat</h5>
          <div class="chat-avatar">
            <img
              src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif"
              alt=""
            />
          </div>
        </div>

        {sortedMessages && (
          <div ref={messageListRef} class="chat-scrollview">
            <div class="chat-messagelist">
              {sortedMessages?.map((msg, index) => {
                if (msg.sender === "Admin") {
                  return (
                    <div class="chat-cluster">
                      <div>
                        <div class="chat-message">{msg.text}</div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div mine class="chat-cluster-mine">
                      <div>
                        <div class="chat-message">{msg.text}</div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div
              class="input-group px-2"
              style={{
                position: "sticky",
                bottom: "0",
                backgroundColor: "#e6e6e6",
              }}
            >
              <form class="input-group mb-3" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  class="form-control shadow-none"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div
                  className="btn btn-primary"
                  style={{ background: "#00AAFF", border: "none" }}
                  onClick={handleSendMessage}
                >
                  <i class="fa-regular fa-paper-plane"></i>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserChat;
