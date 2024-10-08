import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './../css/Flashcard.css';

const Flashcard = ({ flashcard, onCorrect, onIncorrect }) => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);  // Flip the card when clicked
  };

  return (
    <div className="flashcard-container">
      <div className="icon-container mb-5">
        <FontAwesomeIcon 
          icon={faCheckCircle} 
          className="icon right-icon" 
          onClick={()=>{
            onCorrect();
            setFlipped(false)
          }}  // Correct icon functionality
        />
        <FontAwesomeIcon 
          icon={faTimesCircle} 
          className="icon wrong-icon" 
          onClick={()=>{
            onIncorrect();
            setFlipped(false)
          }}  // Incorrect icon functionality
        />
      </div>

      <div className="flashcard" onClick={handleFlip}>
        <Card className="card-content">
          <Card.Body>
            {!flipped ? (
              <h2 className="highlight-text">
                {flashcard.word}  {/* Display the word */}
              </h2>
            ) : (
              <div>
                <center>
                  <h5><span className="reading mb-3"><b>{flashcard.reading}</b></span></h5>
                </center>
                <h4 className="highlight-text">{flashcard.meaning}</h4>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Flashcard;
