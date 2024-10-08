import React from 'react';
import { Card } from 'react-bootstrap';

const Sidebar = ({ totalWords, correctCount, incorrectCount }) => {
  return (
    <Card className="sidebar">
      <Card.Body>
        <h5>Statistics</h5>
        <p>Total Words: {totalWords}</p>
        <p>Correct: {correctCount}</p>
        <p>Incorrect: {incorrectCount}</p>
      </Card.Body>
    </Card>
  );
};

export default Sidebar;
