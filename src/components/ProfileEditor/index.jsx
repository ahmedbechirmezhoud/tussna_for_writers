import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    FormInput,
    FormTextarea,
    Button,
    Form
  } from "shards-react";

import { Formik } from 'formik';
import * as Yup from 'yup'


const ProfileEditor = ({ handleSubmit, initialValues, SubmitButton, SecondButtonTo, SecondButton, required }) => {

    const [alert, setAlert] = useState()


    useEffect(() => {
        setTimeout(() => setAlert(undefined), 10000)
    }, [alert])


    const [schema, setSchema] = useState({
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!'),

        lastName: Yup.string()  
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!'),   

        profession: Yup.string()  
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!'),   
        
        description: Yup.string()  
          .min(25, 'Too Short!')  
          .max(500, 'Too Long!'),   

        password : Yup.string()
          .min(6, 'Too Short!')  
          .max(16, 'Too Long!'),   
        
        Cpassword : Yup.string()
          .min(6, 'Too Short!')  
          .max(16, 'Too Long!')   
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
     
        email: Yup.string().email('Invalid email'),
     
      })
    
    useEffect(() => {
        if(required){
            let aux = schema
            Object.keys(aux).forEach((key) => aux[key] =  aux[key].required("required") )
            setSchema(aux)
        }
    }, [required])

    const SignupSchema = Yup.object().shape(schema);

    return (       
    <Formik
    initialValues={{ firstName : "", lastName : "", profession :"", email : "", password :"", Cpassword: "", description : "", ...initialValues}}
    setValues={() => initialValues}
    validationSchema={SignupSchema}
    onSubmit={handleSubmit}
    >
            {({values,errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (<Form>
        <Row form>
            {/* First Name */}
            <Col md="6" className="form-group">
            <label htmlFor="feFirstName">First Name</label>
            <FormInput
                invalid={Boolean(errors.firstName)} 
                valid={touched.firstName && !errors.firstName} 
                type="text"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                value={values.firstName}
                id="feFirstName"
            />
            </Col>
            {/* Last Name */}
            <Col md="6" className="form-group">
            <label htmlFor="feLastName">Last Name</label>
            <FormInput
                invalid={Boolean(errors.lastName)} 
                valid={touched.lastName && !errors.lastName} 
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Last Name"
                value={values.lastName}
                id="feLastName"
            />
            </Col>
        </Row>
        <Row form>
            {/* Profession */}
            <Col md="6" className="form-group">
            <label htmlFor="feProfession">Profession</label>
            <FormInput
                invalid={Boolean(errors.profession)} 
                valid={touched.profession && !errors.profession} 
                type="text"
                name="profession"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Profession"
                value={values.profession}
                id="feProfession"
            />
            </Col>
            {/* Email */}
            <Col md="6" className="form-group">
            <label htmlFor="feEmail">Email</label>
            <FormInput
                invalid={Boolean(errors.email)} 
                valid={touched.email && !errors.email} 
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="feEmail"
                placeholder="Email Address"

            />
            </Col>
            
        </Row>
        <Row form>
            {/* Password */}
            <Col md="6" className="form-group">
            <label htmlFor="fePassword">Password</label>
            <FormInput
                invalid={Boolean(errors.password)} 
                valid={touched.password && !errors.password} 
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                id="fePassword"
                placeholder="Password"
            />
            </Col>
            {/* Confirm Password */}
            <Col md="6" className="form-group">
            <label htmlFor="feCPasword">Confirm Password</label>
            <FormInput
                invalid={Boolean(errors.Cpassword)} 
                valid={touched.Cpassword && !errors.Cpassword} 
                type="password"
                name="Cpassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.Cpassword}
                id="feCPasword"
                placeholder="Password"
            />
            </Col>
            
        </Row>
        
        <Row form>
            {/* Description */}
            <Col md="12" className="form-group">
            <label htmlFor="feDescription">Description</label>
            <FormTextarea id="feDescription" rows="5"
                invalid={Boolean(errors.description)} 
                valid={touched.description && !errors.description} 
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
            />
            </Col>
        </Row>
        <Button theme="primary" onClick={handleSubmit} className="mb-2 mr-1">
            {SubmitButton}
        </Button>
            {SecondButton && (<Link to={SecondButtonTo}> 
            <Button outline theme="secondary" className="mb-2 mr-1">
                {SecondButton}
            </Button>
            </Link>
            )}
        </Form>                                  
        )}
    </Formik>
                            
    )
}

export default ProfileEditor