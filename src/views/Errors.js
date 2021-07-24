import React from "react";
import { Container, Button } from "shards-react";

const Errors = ({ error }) => (
  <Container fluid className="main-content-container px-4 pb-4">
    <div className="error">
    <div className="error__content">
     {error ? ( <>
        <h2>{error.code}</h2>
        <h3>{error.name}</h3>
        <p>{error.message}</p>
        <Button pill>&larr; Go Back</Button>
        </>
      ) : <h2>NO ERROR</h2>}
      </div>
    </div>
  </Container>
);

export default Errors;
