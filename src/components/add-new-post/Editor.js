import React, {useContext, useEffect, useState} from "react";
import { Card, CardBody, Form, FormInput, InputGroup, InputGroupAddon, InputGroupText, Button  } from "shards-react";

import "react-quill/dist/quill.snow.css";
import "../../assets/quill.css";

import ArticleEditor from "../ArticleEditor"

import { ArticleContext } from '../../Contexts/articleContext'

const Editor = () => {

  const { state, dispatch } = useContext(ArticleContext);

  const [ autoGenerate,setAutoGenerate ] = useState(true)

  useEffect(()=> {
    autoGenerate && dispatch({ payload : {slug : state.title.replace(/\s+/g,'-')} })
  }, [state.title, autoGenerate])
  
  return (<Card small className="mb-3">
    <CardBody>
      <Form className="add-new-post">
        <FormInput size="lg" className="mb-3" placeholder="Your Post Title" value={state.title} onChange={(e) => dispatch({ payload : {title : e.target.value} })}  />
        <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>tussna.com/</InputGroupText>
          </InputGroupAddon>
          <FormInput  size="lg" placeholder="Slug" value={state.slug} onChange={(e) => dispatch({ payload : {slug : e.target.value} })}  />
          <InputGroupAddon type="append">
            <Button onClick={() => setAutoGenerate(!autoGenerate)} theme={autoGenerate ? "primary" : "grey"}>auto</Button>
          </InputGroupAddon>
        </InputGroup> 
        <ArticleEditor  />
      </Form>
    </CardBody>
  </Card>
);
}

export default Editor;
