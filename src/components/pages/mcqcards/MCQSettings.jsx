import React, { useState } from "react";
import { Button, Container, Form , Row ,Col } from "react-bootstrap";


const MCQSettings = ({ onTypeSelected }) => {
  const [selectedType, setSelectedType] = useState("word-reading");

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const handleStartQuiz = () => {
    onTypeSelected(selectedType); // Pass the selected type to the parent
  };

  return (
  <Container>
      <div>
      <h3 className="mt-4 mb-4">Select MCQ Type</h3>
      <Form>
       <Row>
        <Col>
        <Form.Check
        className="mb-3"
          type="radio"
          label="(Kanji) → (hiragana)"
          value="word-reading"
          checked={selectedType === "word-reading"}
          onChange={handleTypeChange}
        />
        <Form.Check
          type="radio"
           className="mb-3"
          label="(hiragana) → (kanji)"
          value="reading-word"
          checked={selectedType === "reading-word"}
          onChange={handleTypeChange}
        />
        <Form.Check
          type="radio"
           className="mb-3"
          label="(Kanji + Hiragana) → Meaning"
          value="word-reading-meaning"
          checked={selectedType === "word-reading-meaning"}
          onChange={handleTypeChange}
        />
        </Col>
       </Row>
      </Form>
      <Button variant="primary" className="mt-3" onClick={handleStartQuiz}>
        Start Quiz
      </Button>
    </div>
  </Container>
  );
};

export default MCQSettings;
