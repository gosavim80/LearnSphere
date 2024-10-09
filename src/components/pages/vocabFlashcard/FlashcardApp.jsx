import React, { useState } from 'react';
import Flashcard from './Flashcard';
import Sidebar from './Sidebar';
import FlashcardUploader from './FlashcardUploader';
import { Container, Row, Col, Button } from 'react-bootstrap';

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [incorrectFlashcards, setIncorrectFlashcards] = useState([]);
  const [reviewingIncorrect, setReviewingIncorrect] = useState(false);
  const [recheckMode, setRecheckMode] = useState(false);

  const handleDataLoaded = (data) => {
    setFlashcards(data);
    resetReview();
  };

  const handleCorrect = () => {
    setCorrectCount((prev) => prev + 1);
    goToNextCard();
  };

  const handleIncorrect = () => {
    setIncorrectCount((prev) => prev + 1);
    setIncorrectFlashcards((prev) => [...prev, flashcards[currentIndex]]);
    goToNextCard();
  };

  const goToNextCard = () => {
    if (reviewingIncorrect) {
      // When reviewing incorrect cards, check if we need to go to the next incorrect card
      if (currentIndex < incorrectFlashcards.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Reset review after finishing incorrect cards
        resetReview();
      }
    } else {
      // Go to next card in the main list
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        // Check if we should switch to reviewing incorrect cards
        if (incorrectCount > 0) {
          setReviewingIncorrect(true);
          setCurrentIndex(0); // Reset index to the first incorrect flashcard
        } else {
          // If no incorrect answers, reset everything for a new session
          resetReview();
        }
      }
    }
  };

  const resetReview = () => {
    setCurrentIndex(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setIncorrectFlashcards([]);
    setReviewingIncorrect(false);
    setRecheckMode(false);
  };

  const handleRecheck = () => {
    setFlashcards(incorrectFlashcards);
    setRecheckMode(true);
    resetReview(); // Reset counters for incorrect recheck flow
  };

  const progressPercentage = ((currentIndex + 1) / (reviewingIncorrect ? incorrectFlashcards.length : flashcards.length)) * 100;
  const isReviewComplete = (correctCount + incorrectCount) === flashcards.length;

 
  return (
    <Container fluid className='mt-5'>
      
      <Row>
        <Col md={3}>
          {flashcards.length > 0 && (
            <Sidebar
              totalWords={flashcards.length}
              correctCount={correctCount}
              incorrectCount={incorrectCount}
            />
          )}
        </Col>
        <Col md={9}>
          {flashcards.length > 0 && !isReviewComplete ? (
            <Flashcard
              flashcard={reviewingIncorrect ? incorrectFlashcards[currentIndex] : flashcards[currentIndex]}
              onCorrect={handleCorrect}
              onIncorrect={handleIncorrect}
              progress={progressPercentage}
            />
          ) : isReviewComplete && !recheckMode ? (
            <>
              {/* <h5>You've completed the review!</h5> */}
              <p>Total correct: {correctCount}</p>
              <p className='mb-5'>Total incorrect: {incorrectCount}</p>

              {incorrectCount > 0 && (
                <Button onClick={handleRecheck} variant="warning">
                  Recheck Incorrect Words
                </Button>
              )}
            </>
          ) : recheckMode && (
            <>
              <h5>Rechecking incorrect words...</h5>
              {incorrectFlashcards.length > 0 && (
                <Flashcard
                  flashcard={incorrectFlashcards[currentIndex]}
                  onCorrect={handleCorrect}
                  onIncorrect={handleIncorrect}
                  progress={progressPercentage}
                />
              )}
            </>
          )}

          {flashcards.length <= 0 && (
            <FlashcardUploader onDataLoaded={handleDataLoaded} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FlashcardApp;
