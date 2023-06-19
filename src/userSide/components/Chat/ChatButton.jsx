import React, { useState } from "react";
import UserChat from "./UserChat";

function ChatButton() {
    const [isShowDialog, setIsDialog] = useState(false);
    const handleUserChatClick = () => {
        setIsDialog(false);
    };
    return (
        <div>
            {!isShowDialog && (
                <button
                    className="chat-button-show"
                    onClick={() => setIsDialog(true)}
                    style={{ zIndex: "999" }}
                >
                    <i className="fa-regular fa-message"></i>
                </button>
            )}
            {isShowDialog && (
                <div >
                    <UserChat onHideDialog={handleUserChatClick}></UserChat>
                </div>
            )}
        </div>
    );
}

export default ChatButton;
