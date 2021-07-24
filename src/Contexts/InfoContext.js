import React, { useReducer, createContext, useMemo } from "react";


//CREATE ARTICLE CONTEXT
export const InfoContext = createContext(); 
  

//REDUCER WITH A SINGLE ACTION TYPE
const reducer = (state, action) => {
  return {...action.payload}
};

/*
    STATE EXEMPLE
const info = {
  error: {
    code : "500",
    name : "Something went wrong!",
    message : "There was a problem on our end. Please try again later. "
  },
  message : {
    type : "danger",
    message : "No user exists"
  },
  loading : true
}

*/
export const InfoProvider = ({ children }) => {
  
    const defaultInfo = {
        error: undefined,
        message : undefined,
        loading : true
    }
  
    const [state, dispatch] = useReducer(reducer, defaultInfo);


    const contextValue = useMemo(() => {
      return { state, dispatch };
    }, [state, dispatch ]);
  
  
  
      return (
        <InfoContext.Provider value={contextValue}>
          {children}
        </InfoContext.Provider>
      );
    };
