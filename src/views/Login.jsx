import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    FormInput,
    Button,
    Card,
    CardHeader,
    Container,
    Col,
    Row, 
    Alert
  } from "shards-react";
  import { Formik } from 'formik';

import Loading from '../components/Loading'
import { Link, useHistory } from 'react-router-dom';

const Login = () => {
    
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('email');
    provider.addScope('public_profile');
    provider.setCustomParameters({
        'display': 'popup'
    });

    const history = useHistory()

    const handleClick = () => {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            alert(result.user.displayName,  "loged in" )
            history.push('/')
        });
    }

    const [alert, setAlert] = useState()

    const handleSubmit = (values, { setSubmitting }) => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password).then((userCredential) => {
            setSubmitting(false)
            history.push('/')   
        })
        .catch((e) => {setAlert(e.message); setSubmitting(false)} )
    }

    useEffect(() => {
        setTimeout(() => setAlert(undefined), 10000)       
    }, [alert])

    return (
        <Container fluid className="px-0"  >
            <Row>
                <Col>
                    {alert && (<Alert className="mb-0" theme="danger"><i className="fa fa-info mx-2"></i>{alert}</Alert>)}
                </Col>
            </Row>
            <Row  >
            <Col sm="15" md="4" lg="4"></Col>
            <Col sm="15" md="4" lg="4" style={{padding : '50px'}}>
            <Card small className="mb-4" >
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Log in Tussna for Writers</h6>
                </CardHeader>
                <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={values => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    return errors;
                  }}
                  onSubmit={handleSubmit}
                 >
                     {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                    }) => isSubmitting ? <Loading /> : (
                        <form style={{padding : '50px'}}>
                    <InputGroup seamless className="mb-3">
                        <InputGroupAddon type="prepend">
                            <InputGroupText>
                            <i className="material-icons">person</i>
                            </InputGroupText>
                        </InputGroupAddon>
                        <FormInput 
                            invalid={errors.email} 
                            valid={touched.email && !errors.email} 
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="email"
                            value={values.email}/>
                    </InputGroup>
                    <InputGroup seamless className="mb-3">
                        <FormInput
                            type="password"
                            name="password"
                            onChange={handleChange}              
                            onBlur={handleBlur}  
                            placeholder="password"             
                            value={values.password}
                            invalid={errors.password}
                        />
                        <InputGroupAddon type="append">
                            <InputGroupText>
                            <i className="material-icons">lock</i>
                            </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                    <Button theme="primary" onClick={handleSubmit} className="mb-2 mr-1">
                        Login
                    </Button>
                    <Link to="/register"> 
                        <Button outline theme="secondary" className="mb-2 mr-1">
                            Register
                        </Button>
                    </Link>
                <Button block onClick={handleClick} style={{marginTop : "20px", backgroundColor : "#4267B2", fontSize : "14px"}} ><i className="material-icons" style={{padding : '5px'}}>facebook</i>LOGIN WITH FACEBOOK</Button>    
                        </form>)}
                </Formik>
            </Card>
            </Col>
            </Row>
    </Container>)
}


export default Login