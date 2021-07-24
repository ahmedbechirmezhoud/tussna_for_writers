import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col
} from "shards-react";
import ProfileEditor from "../ProfileEditor";

import firebase from "firebase";

import { InfoContext } from "../../Contexts/InfoContext";


const UserAccountDetails = ({ title, authorData, user, ready }) => {

  const { dispatch : dispatchInfo } = useContext(InfoContext)

  const handleSubmit = (values, { setSubmitting }) => {
    
    if(authorData.email !== values.email){
      user.updateEmail(values.email).then(() => dispatchInfo({ payload : { message : { message : "Email updated correctly" , type:"success"} } }) )
      .catch((e) => dispatchInfo({ payload : { message : { message : e.message , type:"danger"} } }) )
    }

    let { firstName, lastName, profession, description } = values;
    const NewData = { firstName, lastName, profession, description }
    let { PfirstName, PlastName, Pprofession, Pdescription } = authorData;
    const PrevData = { PfirstName, PlastName, Pprofession, Pdescription }
    if(NewData !== PrevData) {
      firebase.firestore().collection('authors').doc(String(user.uid)).update({...NewData})
        .then(() =>dispatchInfo({ payload : { message : { message : "Profile Updated correctly" , type:"success"} } }))
        .catch((e) => dispatchInfo({ payload : { message : { message : e.message , type:"danger"} } }) )

      user.updateProfile({displayName : firstName + " " + lastName }).then(() => alert("displayed Name updated"))

    }
    if(values.password) user.updatePassword(values.password)
      .then(() => dispatchInfo({ payload : { message : { message : "Password updated correctly" , type:"success" } } }))
    alert("up to date")
    setSubmitting(false)
  }

  return(
    <Card small className="mb-4">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
      </CardHeader>
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <Row>
            <Col>
              {ready && <ProfileEditor handleSubmit={handleSubmit} initialValues={authorData} SubmitButton="Update Profile" required/>}
            </Col>
          </Row>
        </ListGroupItem>
      </ListGroup>
    </Card>
  );
}
UserAccountDetails.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

UserAccountDetails.defaultProps = {
  title: "Account Details"
};

export default UserAccountDetails;
