import React, { useContext, useEffect, useState } from 'react'

import { ArticleContext } from '../../Contexts/articleContext';
import { EDITOR_JS_TOOLS } from './config';

import './editor.css' 

 
import EditorJs from 'react-editor-js'


import { Button, Tooltip } from 'shards-react'
import { InfoContext } from '../../Contexts/InfoContext';




const ArticleEditor = () => {
    
    const  { dispatch : InfoDispatch } = useContext(InfoContext)

    const { state, dispatch, changed, setChanged } = useContext(ArticleContext);
    const [editorInstance, setEditorInstance] = useState();
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(!changed)
    }, [changed])

    useEffect(() => {
        editorInstance && editorInstance.isReady
            .then(() => editorInstance.render(state.content))
            .catch((e) => InfoDispatch({ payload : { error : { message : JSON.stringify(e), name :"Editor is not Ready try later", code : "Editor Error" } } }))
    }, [state.content])


    return(
        <div dir="rtl" lang="ar" 
        style={{ marginTop :"40px", borderStyle: "solid", borderColor: "#CDCDCD", borderRadius :".375rem", border: "1px solid #e1e5eb", padding:" 15px 0"}}>
           
            <EditorJs
                tools={EDITOR_JS_TOOLS}
                data={state.content}
                instanceRef={instance =>  setEditorInstance(instance)}
                placeholder="Write down here!"
                onChange={() => setChanged(true)}

            />

            <Tooltip
                open={open && !changed}
                target="#TooltipExample"
                toggle={() => setOpen(!open)}
                >
                Article is saved correctly, nothing to add 
                and previous state was overwritten nothing to restore
            </Tooltip>


        <div style={{ right: 0, position: 'absolute', transform:" translate(-10px, -10px)" }} id="TooltipExample" >
            <Button  outline onClick={(e) => {
                e.preventDefault()
                editorInstance && editorInstance.render(state.content)
                setChanged(false)
                
            } } theme="danger" disabled={!changed}>REDO</Button>
            <Button outline onClick={(e) => {
                e.preventDefault()
                editorInstance && editorInstance.saver.save().then((value) =>{
                console.log(value)
                dispatch({ payload : { content : value }})
                setChanged(false)
                })
                
            } } theme="primary" disabled={!changed}>SAVE</Button>
            
        </div>
        </div>
    )
}


export default ArticleEditor;