import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";

const FlashcardUploader = ({ onDataLoaded }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError(null); // Clear any previous errors
  };

  // Function to shuffle an array (Fisher-Yates algorithm)
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const flashcards = [];

      let currentWord = "";
      let currentMeaning = "";

      lines.forEach((line) => {
        const trimmedLine = line.trim();

        // Skip blank lines
        if (trimmedLine === "") {
          if (currentWord && currentMeaning) {
            flashcards.push({
              word: currentWord.match(/(.+?)（(.+?)）/) 
                ? currentWord.match(/(.+?)（(.+?)）/)[1] 
                : currentWord,
              meaning: currentMeaning,
              reading: currentWord.match(/(.+?)（(.+?)）/)
                ? currentWord.match(/(.+?)（(.+?)）/)[2]
                : "", // Extract reading or set placeholder
            });
            currentWord = ""; // Reset for next flashcard
            currentMeaning = ""; // Reset for next flashcard
          }
          return; // Skip to the next line
        }

        // Check if the line is a word or meaning based on the order
        if (!currentWord) {
          currentWord = trimmedLine; // First non-blank line is the word
        } else {
          currentMeaning = trimmedLine; // Second non-blank line is the meaning
        }
      });

      // Check if there's an unprocessed card at the end
      if (currentWord && currentMeaning) {
        flashcards.push({
          word: currentWord.match(/(.+?)（(.+?)）/) 
            ? currentWord.match(/(.+?)（(.+?)）/)[1] 
            : currentWord,
          meaning: currentMeaning,
          reading: currentWord.match(/(.+?)（(.+?)）/)
            ? currentWord.match(/(.+?)（(.+?)）/)[2]
            : "", // Extract reading or set placeholder
        });
      }

      // Shuffle the flashcards array before sending it to onDataLoaded
      shuffleArray(flashcards);

      if (flashcards.length === 0) {
        setError("No valid flashcards found in the file.");
      } else {
        setError(null); // Clear any errors if parsing was successful
        onDataLoaded(flashcards); // Send shuffled flashcards
      }
    };

    reader.onerror = () => {
      setError("Error reading the file. Please try again.");
    };

    reader.readAsText(file);
  };

  return (
    <div className="flashcard-uploader">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formFile">
        <Form.Label>Upload Flashcard File</Form.Label>
        <Form.Control type="file" accept=".txt" onChange={handleFileChange} />
      </Form.Group>
      <Button variant="primary" className="mt-3" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default FlashcardUploader;
