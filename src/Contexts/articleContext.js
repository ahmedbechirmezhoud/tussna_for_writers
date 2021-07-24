import React, { useReducer, createContext, useMemo, useEffect, useState, useContext } from "react";
import { InfoContext } from "./InfoContext";

import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import { useDocumentOnce } from 'react-firebase-hooks/firestore'

//CREATE ARTICLE CONTEXT
export const ArticleContext = createContext(); 
  

//REDUCER WITH A SINGLE ACTION TYPE
const reducer = (state, action) => {
  return {...state, ...action.payload}
};



export const ArticleProvider = ({ children, id }) => {


  const { dispatch : dispatchInfo } = useContext(InfoContext)
  

  //DEFAULT STATE
  const article = {
    title : "",
    slug: "",
    content: {},
    status:"draft",
    category : [],
    tags : [],
    authorID : String(firebase.auth().currentUser.uid) || ""
  }

  const [state, dispatch] = useReducer(reducer, article);

  const ArticleCollection = firebase.firestore().collection("articles")

  const loading = false

  if(id){
    const [value, loading, error] = useDocumentOnce(ArticleCollection.doc(id))
      //OnLoad fetch data from firestore firebase
      useEffect(() => {
        if(!loading){
          if(error)
            dispatchInfo({ payload : {error} })
          else {
            if(value.exists){
            dispatch({ payload : value.data() })
            }
            else
              dispatchInfo({ payload : { error : {code : "404", name : "Article Does not exists", message : "Try contacting the admin"} } })
          }
        }
      }, [value, loading, error])
  }

  const [changed, setChanged] = useState(false)

/**
 * Push Article to firestore or Update Article if ID exists.
 */
  const saveArticle = () => {
    if(id) ArticleCollection.doc(id).set(state)
      .then(() => {
        dispatchInfo({ payload : { message : { message : "Article Updated successfully", type : "success" } } })})
      .catch((e) => dispatchInfo({ payload : { message : {  message : e.message + ", please contact an administrator", type : "danger" } } }) )

    else ArticleCollection.doc().set(state)
      .then(() => dispatchInfo({ payload : { message : { message : "Article added successfully", type : "success" } } }))
      .catch((e) => dispatchInfo({ payload : { message : {  message : e.message + ", please contact an administrator", type : "danger" } } }) )

  }


  const contextValue = useMemo(() => {
    return { state, dispatch, saveArticle, loading, changed, setChanged };
  }, [state, dispatch, saveArticle, loading, changed, setChanged]);



    return (
      <ArticleContext.Provider value={contextValue}>
        {children}
      </ArticleContext.Provider>
    );
  };