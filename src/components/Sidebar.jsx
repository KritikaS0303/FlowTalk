import React from "react";
import "./Sidebar.css"; // Optional: only if you have styles

const Sidebar = () => {
  return (
    <aside className="online-users">
      <h2>Online Users</h2>
      <ul id="userList" className="user-list"></ul>
    </aside>
  );
};

export default Sidebar;
