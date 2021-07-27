import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";

import ProfileEditor from '../components/ProfileEditor'

import firebase from 'firebase'
import 'firebase/auth'

import * as Yup from 'yup'

import {
    Card,
    CardHeader,
    ListGroup,
    ListGroupItem,
    Row,
    Col,
    Container,
    Alert
  } from "shards-react";

import { InfoContext } from "../Contexts/InfoContext";

const Register = () => {

    const [alert, setAlert] = useState()

    const { dispatch : dispatchInfo } = useContext(InfoContext)

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => setAlert(undefined), 10000)
    }, [alert])

    const handleSubmit = (values, { setSubmitting })  => {
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
            userCredential.user.updateProfile({ displayName : values.firstName + " " + values.lastName })
            firebase.firestore().collection('authors').doc(userCredential.user.uid).set({
                'firstName' : values.firstName,
                'lastName' : values.lastName,
                'profession' : values.profession,
                'description' : values.description
            }).then(() => {
              dispatchInfo({ payload : { message : { message : "Profile created welcome, " + values.firstName, type :"success" }} })
            })
            setSubmitting(false)
            history.push('/')   
        })
        .catch((e) => {
          dispatchInfo({ payload : { message : { message : e.message, code : e.code, type :"danger" }} })
        })
    }

    const schema = {
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!')
          .required("required"),

        lastName: Yup.string()  
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!')
          .required("required"), 

        profession: Yup.string()  
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!')
          .required("required"),  
        
        description: Yup.string()  
          .min(25, 'Too Short!')  
          .max(500, 'Too Long!')
          .required("required"),   

        password : Yup.string()
          .min(6, 'Too Short!')  
          .max(16, 'Too Long!')
          .required("required"),   
        
        Cpassword : Yup.string()
          .min(6, 'Too Short!')  
          .max(16, 'Too Long!')   
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required("required"),
     
        email: Yup.string().email('Invalid email').required("required"),
     
      }

    return(
        <Container>
            <Row>
                <Col>
                    {alert && (<Alert className="mb-0" theme="danger"><i className="fa fa-info mx-2"></i>{alert}</Alert>)}
                </Col>
            </Row>
            <Row>
                <Col style={{padding : '100px'}}>
                    <Card small className="mb-4">
                        <CardHeader className="border-bottom">
                        <h6 className="m-0">Become a Writer</h6>
                        </CardHeader>
                        <ListGroup flush>
                        <ListGroupItem className="p-3">
                            <Row>
                            <Col>
                                <ProfileEditor  Pschema={schema} handleSubmit={handleSubmit} SubmitButton="Register" SecondButton="Login" SecondButtonTo="/login"  required={true}/>
                            </Col>
                            </Row>
                        </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Register