/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useContext } from "react";
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
  FormSelect
} from "shards-react";

import { ArticleContext } from '../../Contexts/articleContext';


const SidebarActions = ({ title }) => {

  const { state, dispatch, saveArticle, changed } = useContext(ArticleContext)

  

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
