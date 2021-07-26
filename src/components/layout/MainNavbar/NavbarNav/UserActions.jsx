import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import 'firebase/auth'
import { useHistory } from "react-router-dom";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";


function UserActions(){

  const history = useHistory()

  const [visible, setVisible] = useState(false)

  const toggleUserActions = () => {
    setVisible(!visible)
  }

  const [user] = useAuthState(firebase.auth())


  return (
    <NavItem tag={Dropdown} caret toggle={toggleUserActions}>
      <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
          className="user-avatar rounded-circle mr-2"
          src={user && user.photoURL}
          alt="User Avatar"
        />{" "}
        <span className="d-none d-md-inline-block">{user.displayName}</span>
      </DropdownToggle>
      <Collapse tag={DropdownMenu} right small open={visible}>
        <DropdownItem href="/profile" to="edit-user-profile">
          <i className="material-icons">&#xE8B8;</i> Edit Profile
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem className="text-danger" onClick={() => {
          firebase.auth().signOut().then(() => {
            history.push('/login')
          })
        }}  >
          <i className="material-icons text-danger">&#xE879;</i> Logout
        </DropdownItem>
      </Collapse>
    </NavItem>
  );

}

export default UserActions;