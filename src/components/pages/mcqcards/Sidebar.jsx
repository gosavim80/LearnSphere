// Sidebar.js
import React from "react";
import { ListGroup } from "react-bootstrap";

const Sidebar = ({ correctCount, incorrectCount, totalWords }) => {
  return (
    <ListGroup>
      <ListGroup.Item>Total Words: {totalWords}</ListGroup.Item>
      <ListGroup.Item>Correct Answers: {correctCount}</ListGroup.Item>
      <ListGroup.Item>Incorrect Answers: {incorrectCount}</ListGroup.Item>
    </ListGroup>
  );
};

export default Sidebar;
