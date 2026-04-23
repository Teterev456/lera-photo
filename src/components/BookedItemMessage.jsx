import React from "react";

const BookedItemMessage = ({ msg }) => {
  return (
    <div className="chat-message">
      <span className="chat-meta meta-text-sm">{msg.author_name} &gt;</span>
      {" " + msg.text}
    </div>
  );
};

export default BookedItemMessage;
