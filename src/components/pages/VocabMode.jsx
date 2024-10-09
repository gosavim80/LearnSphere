import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const VocabMode = () => {
  return (
    <div className="text-center mt-5">
      <h2>Vocabulary Section</h2>
      <p>Select an option below:</p>
      <div className="d-flex justify-content-center">
        <Link to="/vocabulary/practice">
          <Button className="btn btn-secondary mx-3">Practice</Button>
        </Link>
        <Link to="/vocabulary/mcq">
          <Button className="btn btn-primary mx-3">MCQ</Button>
        </Link>
      </div>
    </div>
  );
};

export default VocabMode;
