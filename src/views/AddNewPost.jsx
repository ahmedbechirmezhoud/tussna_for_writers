import React from "react";
import { Container, Row, Col } from "shards-react";

import PageTitle from "../components/common/PageTitle";
import Editor from "../components/add-new-post/Editor";
import SidebarActions from "../components/add-new-post/SidebarActions";
import SidebarCategories from "../components/add-new-post/SidebarCategories";

import { useParams } from "react-router-dom";

import { ArticleProvider } from "../Contexts/articleContext";
import SidebarTags from "../components/add-new-post/SidebarTags";



const AddNewPost = () => {

  const { id } = useParams();


  return (
  <Container fluid className="main-content-container px-4 pb-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle sm="4" title={ id ? "Edit Article" : " Add New Article"} subtitle="Blog Posts" className="text-sm-left" />
    </Row>
    <ArticleProvider id={id} >
      <Row>
          {/* Editor */}
          <Col lg="9" md="12">
            <Editor />
          </Col>
      
          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <SidebarActions />
            <SidebarCategories />
            <SidebarTags />
          </Col>
        </Row>
    </ArticleProvider>
  </Container>
  );
}


export default AddNewPost;