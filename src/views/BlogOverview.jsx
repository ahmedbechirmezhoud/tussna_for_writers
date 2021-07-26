import React, { useState, useEffect } from "react";
import { Container, Row, Card, Tooltip, Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";

import EditorJs from 'react-editor-js';
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"
import Checklist from '@editorjs/checklist'

import { EDITOR_JS_TOOLS } from "../components/ArticleEditor/config";

const BlogOverview = () => {
  const [data, setData] = useState({})
  const [changed, setChanged] = useState(false)
  const [editorInstance, setEditorInstance] = useState();
  const [open, setOpen] = useState(false)

  useEffect(() =>{
     setData({
      "time" : 1627040466105,
      "blocks" : [
          {
              "id" : "eXkk-a12o0",
              "type" : "header",
              "data" : {
                  "text" : "WELCOME TO TUSSNA FOR WRITERS",
                  "level" : 2
              }
          },
          {
              "id" : "2AlEmxES-Q",
              "type" : "paragraph",
              "data" : {
                  "text" : "YOU ARE A WRITER YOU ARE RESPONSIBLE FOR WHAT YOU WRITE <br>"
              }
          }
      ],
      "version" : "2.22.0"
  })
  }, [])

  useEffect(() => {
      setOpen(!changed)
  }, [changed])

return(
  <Container fluid className="main-content-container px-4">
    {/* Page Header */}
    <Row noGutters className="page-header py-4">
      <PageTitle title="Your Workspace" subtitle="Dashboard" className="text-sm-left mb-3" />
    </Row>
    <Row>
    <Card  style={{  width : "100%"}}>
      <EditorJs
        onChange={() => setChanged(true)}
        enableReInitialize
        instanceRef={instance =>  setEditorInstance(instance)}
        tools={{
          ...EDITOR_JS_TOOLS,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          defaultTune: {
            class:AlignmentBlockTune,
            config:{
              default: "left",
              blocks: {
                header: 'center',
                quote : "center",
                list: 'left'
              }
            }
        },
        }}
        data={data}
      />
      <Tooltip
                open={open && !changed}
                target="#TooltipExample"
                toggle={() => setOpen(!open)}
                >
                Article is saved correctly, nothing to add 
                and previous state was overwritten nothing to restore
            </Tooltip>


        <div style={{ right: 0, position: 'relative', transform:" translate(-10px, -10px)" }} id="TooltipExample" >
            <Button  outline onClick={(e) => {
                e.preventDefault()
                editorInstance && editorInstance.render(data)
                setChanged(false)
                
            } } theme="danger" disabled={!changed}>REDO</Button>
            <Button outline onClick={(e) => {
                e.preventDefault()
                editorInstance && editorInstance.saver.save().then((value) =>{
                console.log(value)
                setData(value)
                setChanged(false)
                })
                
            } } theme="primary" disabled={!changed}>SAVE</Button>
            </div>
      </Card>
    </Row>
    
  </Container>
);
}

export default BlogOverview;
