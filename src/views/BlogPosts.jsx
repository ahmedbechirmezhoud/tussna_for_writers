import React, { useContext, useEffect } from "react";
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
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { InfoContext } from '../Contexts/InfoContext'

export default function BlogPosts()
{  

  const { dispatch } = useContext(InfoContext)
  
  const query = firebase.firestore().collection('articles').limit(2).orderBy('created_on', 'desc')

  const [articles, loading, error] = useCollectionDataOnce(query, {
    idField : "id",
    transform : (val) => {
      /*firebase.firestore().collection('authors').doc(val.authorID).get().then((author) => {
        val["author"] = author.data()
      })*/
      return val
    }
  })

  useEffect(() => {
    error && dispatch({ payload : { error : { ...error } } })
  }, [error])


  return (
    <Container fluid className="main-content-container px-4">
      {/* Page Header */}
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Blog Posts" subtitle="Components" className="text-sm-left" />
      </Row>

      {/* First Row of Posts */}
      <Row>
        { !loading && articles.map((post, idx) => (
          <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
            <Card small className="card-post card-post--1">
              <div
                className="card-post__image"
                style={{ backgroundImage: `url(${post.coverURL})` }}
              >
                <Badge
                  pill
                  className={`card-post__category bg-${post.categoryTheme}`}
                >
                  {post.category[0]}
                </Badge>
                <div className="card-post__author d-flex">
                  <a
                    href={"/writer/" +  post.authorID }
                    className="card-post__author-avatar card-post__author-avatar--small"
                    style={post.author && { backgroundImage: `url('${post.author.photoURL}')` }}
                  >
                  </a>
                </div>
              </div>
              <CardBody  >
                <div  dir="rtl" lang="ar" >
                <h5 className="card-title">
                  <Link to={"/article/" + post.id} className="text-fiord-blue">
                    {post.title}
                  </Link> 
                </h5>
                <p className="card-text d-inline-block mb-3" style={{ textAlign : "right" }} >{ post.content.blocks[0].data.text.substring(0, 100) }...</p>
                </div>
                <span className="text-muted"> {new Date(post.created_on.toDate()).toDateString()} </span>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
