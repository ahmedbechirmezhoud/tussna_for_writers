import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody
} from "shards-react";

import InputTag from "./InputTag";

const SidebarTags = ({ title }) => 
{



return(
  <Card small className="mb-3">
    <CardHeader className="border-bottom">
      <h6 className="m-0">{title}</h6>
    </CardHeader>
    <CardBody className="p-0">
      <InputTag />
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
