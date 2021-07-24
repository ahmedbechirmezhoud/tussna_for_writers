
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Badge,
} from "shards-react";

import PageTitle from "../components/common/PageTitle";

import firebase from 'firebase/app'
import 'firebase/firestore';
import { Link } from "react-router-dom";

export default function BlogPosts()
{

  const [ready, setReady ] = useState(false)
  
  const [authors, setAuthors ] = useState([])

  const [data, setData] = useState([])


  useLayoutEffect(() =>  {
    firebase.firestore().collection('articles').get().then((docs) => { 
      docs.forEach((doc) => {
       setData([...data, {...doc.data(), id : doc.id}])
       setReady(true)
      })
     })
  },[])

  useEffect(() => {
    if(ready){
      let aux = authors
      data.forEach((post, index) => {
        firebase.firestore().collection('authors').doc(post.authorID).get().then((doc) => {
            aux[index] = doc.data()
        })
      })
      setAuthors(aux)
    }
  }, [ready])

  console.log(authors, data)

  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Blog Posts" subtitle="Components" className="text-sm-left" />
      </Row>

      {/* First Row of Posts */}
      <Row>
        { ready && data.map((post, idx) => (
          <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${post.backgroundImage})` }}
              >
                <Badge
                  pill
                  className={`card-post__category bg-${post.categoryTheme}`}
                >
                  {post.category[0]}
                </Badge>
                { console.log(authors[idx]) && (<div className="card-post__author d-flex">
                  <a
                    href="/"
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={{ backgroundImage: `url('${authors[idx].photoURL}')` }}
                  >
                    Written by {authors[idx].firstName + " " + authors[idx].lastName}
                  </a>
                </div>)}
              </div>
              <CardBody>
                <h5 className="card-title">
                  <Link to={"/article/" + post.id} className="text-fiord-blue">
                    {post.title}
                  </Link>
                </h5>
                <p className="card-text d-inline-block mb-3" maxLength="100" >dsf...</p>
                <span className="text-muted">5  </span>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
