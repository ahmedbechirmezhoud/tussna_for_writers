import React, { useState, useEffect } from "react";
import { Container, Row, Card, Tooltip, Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";

import EditorJs from 'react-editor-js';
import AlignmentBlockTune from "editorjs-text-alignment-blocktune"
import Checklist from '@editorjs/checklist'

import { EDITOR_JS_TOOLS } from "../components/ArticleEditor/config";


import { loadState, saveState } from "../Contexts/localStorage";

import defaultWorkspace from "../data/default-workspace";

const BlogOverview = () => {
  const [data, setData] = useState({})
  const [changed, setChanged] = useState(false)
  const [editorInstance, setEditorInstance] = useState(null);
  const [open, setOpen] = useState(false)

  useEffect(() =>{
      setData(loadState('workspace') || defaultWorkspace )
     editorInstance && editorInstance.isReady.then(() => {
      editorInstance.render(data)
     })
  }, [editorInstance])

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
      <div dir="rtl" lang="ar"  > 
      <EditorJs
        onChange={(e) => setChanged(true)}
        instanceRef={instance =>  setEditorInstance(instance)}
        tools={{
          ...EDITOR_JS_TOOLS,
          checklist: {
            class: Checklist,
            inlineToolbar: true,
            tunes : ['defaultTune']
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
      </div>
      </Card>
      <div className=" my-5 mr-2 ml-auto" onKeyDown={(e) => alert(e.code) }>
        <Tooltip
         open={open && !changed}
         target="#TooltipExample"
         toggle={() => setOpen(!open)}
        >
            Workspace Saved on your local browser storage 
        </Tooltip>
        <Button disabled={!changed} id="TooltipExample" onClick={() => {
          editorInstance && editorInstance.save().then((value) =>{
            saveState('workspace', value)
            setChanged(false)
          })
        }} > SAVE </Button>
      </div>
    </Row>
    
  </Container>
);
}

export default BlogOverview;
