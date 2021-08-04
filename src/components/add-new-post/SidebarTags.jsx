import React, { useContext } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody
} from "shards-react";

import InputTag from "./InputTag";

import { ArticleContext } from '../../Contexts/articleContext';


const SidebarTags = ({ title }) => 
{

  const { state,  dispatch } = useContext(ArticleContext)


return(
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <InputTag tags={state.tags} rtl  handleChange={(tags => dispatch({ payload : { tags : tags } }))} />
    </CardBody>
  </Card>
);}

SidebarTags.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

SidebarTags.defaultProps = {
  title: "Tags"
};

export default SidebarTags;
