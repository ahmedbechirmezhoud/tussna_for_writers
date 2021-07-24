import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import UserDetails from "../components/user-profile-lite/UserDetails";
import UserAccountDetails from "../components/user-profile-lite/UserAccountDetails";


import firebase from "firebase";
import 'firebase/auth'
import { useAuthState } from "react-firebase-hooks/auth";


const UserProfileLite = () => {

  const [ authorData, setAuthorData ] = useState({}) 

  const [user, loading] = useAuthState(firebase.auth())

  const [ready, setReady] = useState(false)


  useEffect(() => {
    if(!loading) {
      firebase.firestore().collection('authors').doc(String(user.uid)).get()
        .then((doc) => {
          setAuthorData({
            uid : user.uid,
            ...doc.data(),
            photoURL : user.photoURL,
            email : user.email,
          })
          setReady(true)
    } )
}
  }, [user, loading]) 


  return(
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="4">
          <UserDetails authorData={authorData} ready={ready} user={user} />
        </Col>
        <Col lg="8">
          <UserAccountDetails authorData={authorData} ready={ready} user={user} />
        </Col>
      </Row>
    </Container>
);
}
export default UserProfileLite;
