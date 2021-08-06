import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Badge,
  CardBody
} from "shards-react";

import PageTitle from "../components/common/PageTitle";


import firebase from "firebase";
import 'firebase/auth'

import { useParams } from "react-router";
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { InfoContext } from "../Contexts/InfoContext";


const UserProfile = () => {

  const { id } = useParams()  //Writer ID from request params
 
  const [ authorData, setAuthorData ] = useState({}) 
  const [ loading, setLoading ] = useState(true)

  //Get writer's articles
  const query = firebase.firestore().collection('articles')
  .where("authorID", "==", id)
  .limit(4)
  
  const [posts, Postloading, error ] = useCollectionDataOnce(query)

  
  //raise errors
  const { dispatch } = useContext(InfoContext) 
  useEffect(() => {
    error && dispatch({ payload : { error : {message : error.message, name : error.name, code : '500' } } })
  }, [error])


//Get author's data from firestore
  useEffect(() => {
      firebase.firestore().collection('authors').doc(id).get()
        .then((doc) => {
          if(doc.exists){
            setAuthorData({
              ...doc.data()
            })
            setLoading(false)
            }
          else
           dispatch({ payload : { error : { message : "Writer does not exist", code: '404', name : 'Page not found'  } } })
          
      })
      .catch((e) => {
        dispatch({ payload : { error : { message : e.message, code: e.code, name : e.name  } } })
      })
}
, []) 


  return(
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle title="User Profile" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
      </Row>
      <Row>
        <Col lg="4">
        { !loading && (<Card small className="mb-4 pt-3" >
        <CardHeader className="border-bottom text-center">
          <div className="mb-3 mx-auto">
            <img
              className="rounded-circle"
              src={authorData.photoURL }
              alt={authorData.firstName + " " + authorData.lastName}
              width="110"
              height="110"
            />
          </div>
          <h4 className="mb-0">{authorData.firstName + " " + authorData.lastName}</h4>
          <h6 className="mb-0">{authorData.occupation}</h6>
            {/* Badgets */}
            { authorData.areasOfInterest && authorData.areasOfInterest.map((area, idx) => (
              <Badge
                key={idx}
                outline
                pill
                className={`card-post__category bg mr-2 mt-2`}
              >
              {area}
              </Badge>
            
            ) )}
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-4">
            <strong className="text-muted d-block mb-2">
              {authorData.profession}
            </strong>
            <span>{authorData.description}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>)}
        </Col>
        <Col lg="8">
        <Row>
          {!Postloading && posts.map((post, idx) => (
            <Col lg="12" sm="12" className="mb-4" key={idx}>
              <Card small className="card-post card-post--aside card-post--1">
                <div
                  className="card-post__image"
                  style={{ backgroundImage: `url('${post.coverURL}')` }}
                >
                  <Badge
                    pill
                    className={`card-post__category bg-${post.categoryTheme}`}
                  >
                    {post.category[0]}
                  </Badge>
                </div>
                <CardBody>
                  <h5 className="card-title">
                    <a className="text-fiord-blue" href="/">
                      {post.title}
                    </a>
                  </h5>
                  <p className="card-text d-inline-block mb-3">{ post.content.blocks[0].data.text.substring(0, 200) }...</p>
                  <span className="text-muted">{new Date(post.created_on.toDate()).toDateString()}</span>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
        </Col>
      </Row>
    </Container>
);
}


export default UserProfile
