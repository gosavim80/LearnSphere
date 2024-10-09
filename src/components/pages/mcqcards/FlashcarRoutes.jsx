import React, { useState } from "react";
import FlashcardUploader from "./FlashcardUploader";
import MCQPractice from "./MCQPractice";
import MCQSettings from "./MCQSettings";
import { Container } from "react-bootstrap";

const FlashcardsRoute = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  const handleDataLoaded = (data) => {
    setFlashcards(data);
  };

  const handleTypeSelected = (type) => {
    setSelectedType(type);
  };

  return (
  <Container>
      <div>
      {/* Upload flashcards */}
      {!flashcards.length ? (
        <FlashcardUploader onDataLoaded={handleDataLoaded} />
      ) : (
        <>
          {/* Select MCQ type once flashcards are uploaded */}
          {!selectedType ? (
            <MCQSettings onTypeSelected={handleTypeSelected} />
          ) : (
            <MCQPractice flashcards={flashcards} selectedType={selectedType} />
          )}
        </>
      )}
    </div>
  </Container>
  );
};

export default FlashcardsRoute;
