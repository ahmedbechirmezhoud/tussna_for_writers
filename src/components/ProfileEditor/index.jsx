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
import InputTag from '../add-new-post/InputTag';


const ProfileEditor = ({ Pschema, handleSubmit, initialValues, SubmitButton, SecondButtonTo, SecondButton }) => {

    const [alert, setAlert] = useState()


    useEffect(() => {
        setTimeout(() => setAlert(undefined), 10000)
    }, [alert])


    const schema = ( Pschema || {
        firstName: Yup.string()
          .min(2, 'Too Short!')
          .max(50, 'Too Long!'),

        lastName: Yup.string()  
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!'),   

        occupation: Yup.string()  
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!'),   
        
        description: Yup.string()  
          .min(25, 'Too Short!')  
          .max(500, 'Too Long!'),   

        areasOfInterest: Yup.string()
          .min(2, 'Too Short!')  
          .max(50, 'Too Long!'),

        password : Yup.string()
          .min(6, 'Too Short!')  
          .max(16, 'Too Long!'),   
        
        Cpassword : Yup.string()
          .min(6, 'Too Short!')  
          .max(16, 'Too Long!')   
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
     
        email: Yup.string().email('Invalid email'),
     
      })
    

    const SignupSchema = Yup.object().shape(schema);

    return (       
    <Formik
    initialValues={{ firstName : "", lastName : "", occupation :"", email : "", areasOfInterest : [], password :"", Cpassword: "", description : "", ...initialValues}}
    setValues={() => initialValues}
    validationSchema={SignupSchema}
    onSubmit={handleSubmit}
    >
            {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setValues}) => (<Form>
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
            {/* occupation */}
            <Col md="6" className="form-group">
            <label htmlFor="feOccupation">Occupation</label>
            <FormInput
                invalid={Boolean(errors.occupation)} 
                valid={touched.occupation && !errors.occupation} 
                type="text"
                name="occupation"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="occupation"
                value={values.occupation}
                id="feOccupation"
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
            {/* areasOfInterest */}
            <Col  className="form-group">
            <label htmlFor="feAreasOfInterest">Areas of interest</label>
            <InputTag
                invalid={Boolean(errors.areasOfInterest)} 
                valid={touched.areasOfInterest && !errors.areasOfInterest} 
                type="text"
                name="areasOfInterest"
                onBlur={handleBlur}
                placeholder="Areas of interest"
                id="feAreasOfInterest"
                tags={values.areasOfInterest} 
                handleChange={(tags) => setValues({areasOfInterest : tags})}
                onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
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
                placeholder="Bio, experiences, motivation..."
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