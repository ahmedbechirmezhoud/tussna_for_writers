import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import ProfileEditor from '../components/ProfileEditor'

import firebase from 'firebase'
import 'firebase/auth'

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

const Register = () => {

    const [alert, setAlert] = useState()

    const history = useHistory();

    useEffect(() => {
        setTimeout(() => setAlert(undefined), 10000)
    }, [alert])

    const handleSubmit = (values, { setSubmitting })  => {
        firebase.auth().createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
            firebase.firestore().collection('authors').doc(userCredential.user.uid).set({
                'firstName' : values.firstName,
                'lastName' : values.lastName,
                'profession' : values.profession,
                'description' : values.description
            })
            setSubmitting(false)
            history.push('/')   
        })
        .then((e) => {
            setAlert(JSON.stringify(e))
        })
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
                                <ProfileEditor handleSubmit={handleSubmit} SubmitButton="Register" SecondButton="Login" SecondButtonTo="/login"  required={true}/>
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