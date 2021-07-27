
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
  InputGroupText,
  FormSelect,
  FormInput,
  Tooltip
} from "shards-react";

import { ArticleContext } from '../../Contexts/articleContext';


const SidebarActions = ({ title }) => {

  const { state, dispatch, saveArticle, changed } = useContext(ArticleContext)

  const [open, setOpen] = useState(false)

  const [ imgInfo, setImgInfo ] = useState("")



  useEffect(() => {
    const img = new Image();
    img.src = state.coverURL;
    img.onload = () => {
      setImgInfo("dimension : " + img.width + ", " + img.height)
    }
  }, [state.coverURL]) 

  return(
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>

    <CardBody className="p-0">
      <ListGroup flush>
        <ListGroupItem className="p-3">
          <span className="d-flex mb-2">
            <InputGroup className="mb-3">
            <InputGroupAddon type="prepend">
              <InputGroupText>
                <i className="material-icons mr-1">flag </i> Status
              </InputGroupText>
            </InputGroupAddon>
            <FormSelect value={state.status} onChange={(e) => dispatch({ payload : { status : e.target.value }})}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </FormSelect>
          </InputGroup>
          </span>
          <Tooltip
                open={open && !changed}
                target="#imgPreview"
                toggle={() => setOpen(!open)}
                >
                {imgInfo}
          </Tooltip>
          <img src={state.coverURL} id="imgPreview" alt={state.title}  style={{ maxWidth: "100%" }} />
          <InputGroup className="mb-3">
          <InputGroupAddon type="prepend">
            <InputGroupText>Cover URL</InputGroupText>
          </InputGroupAddon>
          <FormInput  size="md" placeholder="Image URL" value={state.coverURL} onChange={(e) => dispatch({payload : { coverURL : e.target.value}}) } />
        </InputGroup> 

        </ListGroupItem>
        <ListGroupItem className="d-flex px-3 border-0">
          <Button outline theme="danger" size="sm">
            <i className="material-icons">delete</i> Delete
          </Button>
          <Button theme="accent" size="sm" className="ml-auto" disabled={changed} onClick={() => {
            saveArticle()
          } }>
            <i className="material-icons">file_copy</i> Save
          </Button>
        </ListGroupItem>
      </ListGroup>
    </CardBody>
  </Card>
);}

SidebarActions.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarActions.defaultProps = {
  title: "Actions"
};

export default SidebarActions;
