import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  InputGroupAddon,
  FormCheckbox,
  FormInput
} from "shards-react";

import { ArticleContext } from '../../Contexts/articleContext';



const SidebarCategories = ({ title }) => 
{

  const {state, dispatch, loading } = useContext(ArticleContext)
 

  const [newCategory, setNewCategory] = useState("")

  const [categories, setCategories] = useState({
    "mathematics" : false,
    "physics" : false,
    "engineering" : false,
    "economics" : false,
    "computer science" : false,
    "biology" : false
  })

/**
 * 
 * @param {*} categories : { category as String : checked as boolean }
 * @returns categories : string[]
 */
  const transformData = (categories) => {
    let aux = [];
    Object.entries(categories).forEach(([category, checked]) => {
      if(checked) aux.push(category)
    })
    return aux;
  }

  /**
   * 
   * @param {*} category : String
   * add category with true checked; if exist: checked to true
   * update categories state; dispatch new state to Article Context
   */
  const checkCategory = (category) => {
    let aux = categories  
    aux[category.toLowerCase()] = !aux[category.toLowerCase()]
    setCategories(aux)
    dispatch({ payload : { category : transformData(categories) } }) 
  }

  useEffect(() => {
    let auxData = categories
    state.category.forEach(el => {
      auxData[el] = true
    });
    setCategories(auxData)
  }, [state.category])


return(
  <Card small className="mb-3" dir="rtl" lang="ar" >
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <ListGroup flush>
          <ListGroupItem className="px-3 pb-2">
            {Object.entries(categories).map(([category, checked], i) => (
              <FormCheckbox key={i} className="mb-1" onClick={() => checkCategory(category) } value={category}  checked={checked}>
                {category}
              </FormCheckbox>

            ))}
            
          </ListGroupItem>

          <ListGroupItem className="d-flex px-3">
            <InputGroup className="ml-auto">
              <FormInput placeholder="New category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
              <InputGroupAddon type="append">
                <Button theme="white" className="px-2" onClick={(e) => {
                  checkCategory(newCategory)
                }} >
                  <i className="material-icons">add</i>
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </ListGroupItem>
        </ListGroup>
    </CardBody>
  </Card>
);}

SidebarCategories.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarCategories.defaultProps = {
  title: "Categories"
};

export default SidebarCategories;
