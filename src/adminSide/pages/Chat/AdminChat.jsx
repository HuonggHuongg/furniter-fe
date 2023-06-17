import React, { useState, useEffect } from "react";
import {
  ref,
  query,
  equalTo,
  onValue,
  orderByChild,
  push,
  update,
} from "firebase/database";
import { useObject, useList } from "react-firebase-hooks/database";
import { database, serverTimestamp } from "../../../utils/firebase.js";
import "./admin-chat.css";
import { useRef } from "react";

const useUserMessages = (selectedUser) => {
  const [userMessages, setUserMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const messagesRef = ref(database, "messages");

  useEffect(() => {
    if (selectedUser !== "") {
      const adminMessagesRef = query(
        messagesRef,
        orderByChild("receiver"),
        equalTo(selectedUser)
      );

      const userMessagesRef = query(
        messagesRef,
        orderByChild("sender"),
        equalTo(selectedUser)
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
        adminMessagesListener();
        userMessagesListener();
      };
    }
  }, [selectedUser]);

  return { userMessages, adminMessages };
};

function convertTimestampToTime(timestamp) {
  const date = new Date(timestamp);
  const currentDate = new Date();

  // Kiểm tra nếu timestamp là ngày hôm nay
  if (
    date.getDate() === currentDate.getDate() &&
    date.getMonth() === currentDate.getMonth() &&
    date.getFullYear() === currentDate.getFullYear()
  ) {
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    // Định dạng kiểu giờ (24 giờ)
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  } else {
    // Nếu timestamp không phải là ngày hôm nay, hiển thị ngày
    const day = date.getDate();
    const month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0

    // Định dạng ngày (vd: 14/06/2023)
    const formattedDate = `${day}/${month}`;

    return formattedDate;
  }
}

const AdminChat = () => {
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedUserInfo, setSelectedUserInfo] = useState("");

  const [usersSnapshot] = useObject(ref(database, "users"));
  const { userMessages, adminMessages } = useUserMessages(selectedUser);
  const allMessages = [...userMessages, ...adminMessages];
  const sortedMessages = allMessages.sort((a, b) => a.timestamp - b.timestamp);
  const [sortedUsernames, setSortedUsernames] = useState();
  const [keyword, setKeyword] = useState("");

  const handleUserSelection = (user) => {
    setSelectedUser(user.username);
    setSelectedUserInfo(user);
    const newUserPath = `users/` + user.username;
    update(ref(database, newUserPath), {
      adminRead: false,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        sender: "Admin",
        receiver: selectedUser,
        timestamp: serverTimestamp(),
      };

      push(ref(database, "messages"), newMessage);
      const newUserPath = `users/` + selectedUser;
      update(ref(database, newUserPath), {     
        lastMessage: message,
        lastSend: serverTimestamp(),
      });
      setMessage("");
    }
  };
  const messageListRef = useRef(null);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current?.scrollHeight;
    }
  }, [sortedMessages]);

  useEffect(() => {
    if (usersSnapshot && usersSnapshot.val()) {
      const users = usersSnapshot.val();
      const sortedUsernames = Object.keys(users).sort(
        (a, b) => users[b].lastSend - users[a].lastSend
      );
      console.log(sortedUsernames);
      const searchResult = sortedUsernames.filter(item => item.includes(keyword));
      console.log(searchResult);
      const sortedUsers = searchResult.map((username) => ({
        username: username,
        adminRead: users[username].adminRead,
        lastSend: users[username].lastSend,
        avatar: users[username].avatar,
        lastMessage: users[username].lastMessage,
      }));
      setSortedUsernames(sortedUsers);
    }
  }, [usersSnapshot,keyword]);
  console.log(sortedUsernames);
  useEffect(() => {
    if (sortedUsernames?.length > 0) {
      if (!selectedUser) {
        setSelectedUser(sortedUsernames[0].username);
        setSelectedUserInfo(sortedUsernames[0]);
      }
    }
  }, [selectedUser, sortedUsernames]);
  console.log(selectedUserInfo);
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      setKeyword(event.target.value);
    }
  };

  return (
    <>
      <div className="content-wrapper ">
        {/* <div className="d-flex justify-content-center">
          <h4 className="fw-bold py-3 ">Chat support</h4>
        </div> */}
        <div
          className="row chatroom  mt-1 h-100 "
          style={{ marginLeft: "0", marginRight: "0" }}
        >
          <div className="listefriend d-none d-lg-block col-lg-4">
            <div className="row listheader" style={{ background: "#E2EEF7" }}>
              <div className="search h-100 w-100 position-relative d-flex align-items-center">
                <div className="col-12">
                  <input
                    class="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onKeyDown={handleSearch}
                  />
                </div>
              </div>
            </div>
            <div
              className="row listbody position-relative h-100"
              id="scrollstyle"
              style={{ background: "#EBF4FB" }}
            >
              {sortedUsernames && Object.keys(sortedUsernames) ? (
                <ul className="list-group">
                  {sortedUsernames.map((value, index) => (
                    <>
                      <div
                        className={
                          selectedUser === value?.username
                            ? "bg-selected-user custom__border rounded "
                            : "custom__border"
                        }
                        style={{}}
                      >
                        <li
                          className="row"
                          key={index}
                          onClick={() => handleUserSelection(value)}
                        >
                          <div className="col-3 me-2 position-relative">
                            <img
                              src={
                                value.avatar
                                  ? value.avatar
                                  : "https://cdn-icons-png.flaticon.com/512/5987/5987420.png"
                              }
                              className="img-fluid rounded-circle border border-secondary"
                              alt=""
                            />
                            {value?.adminRead && (
                              <span
                                className="position-absolute   p-2 bg-danger border border-light rounded-circle"
                                style={{ transform: "translate(350%, -325%)" }}
                              >
                                <span className="visually-hidden">
                                  New alerts
                                </span>
                              </span>
                            )}
                          </div>
                          <div className="col-8 mt-4 d-flex align-items-center justify-space-between">
                            <div className="d-flex col-12 justify-content-between">
                              <div>
                                {selectedUser === value?.username && (
                                  <div className="col-12 p-0">
                                    <div className="fw-bolder col-12 p-0">
                                      <span>{value.username}</span>
                                    </div>
                                  </div>
                                )}
                                {selectedUser !== value?.username && (
                                  <div className="col-12 p-0">
                                    <span className="">{value.username}</span>
                                  </div>
                                )}{" "}
                                <div className="text-secondary text-small last-message" >
                                  {value?.lastMessage}
                                </div>
                              </div>

                              <div>
                                {value?.lastSend && (
                                  <span>
                                    {convertTimestampToTime(value.lastSend)}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      </div>
                    </>
                  ))}
                </ul>
              ) : (
                <p>No users available.</p>
              )}
            </div>
          </div>
          <div className="chatingzone col-sm-12 col-lg-8 position-relative">
            <div
              className="row chatheader "
              style={{ height: "100px", borderBottom: "1px solid #CFDDE7" }}
            >
              <div className="down col-9 row pr-0 mt-2">
                {selectedUser && (
                  <>
                    <div className="col-2 pr-0 d-flex justify-content-center ">
                      <img
                        style={{ width: "50px", height: "50px" }}
                        src={
                          selectedUserInfo?.avatar
                            ? selectedUserInfo?.avatar
                            : "https://cdn-icons-png.flaticon.com/512/5987/5987420.png"
                        }
                        className="img-fluid rounded-circle border border-secondary"
                        alt=""
                      />
                    </div>
                    <div className="col-10 mt-4 ">
                      {selectedUser && (
                        <h5 className="fw-bolder">{selectedUser}</h5>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div
              className="row chatbody mb-2"
              id="scrollstyle"
              ref={messageListRef}
            >
              <ul className="list-group w-100 position-relative list-unstyled h-100">
                {sortedMessages &&
                  sortedMessages?.map((msg, index) => {
                    if (msg.receiver === "Admin") {
                      return <li className="message-local">{msg.text}</li>;
                    } else {
                      return <li className="message-remote">{msg.text}</li>;
                    }
                  })}
              </ul>
            </div>
            <div>
              <form class="input-group px-1" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  class="form-control shadow-none"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div
                  className="btn btn-dark"
                  style={{ background: "#FC4E4E", border: "none" }}
                  onClick={handleSendMessage}
                >
                  <i class="fa-regular fa-paper-plane"></i>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChat;
