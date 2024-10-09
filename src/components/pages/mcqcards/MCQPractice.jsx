import React, { useState } from "react";
import { Button, Container, Row, Col, Accordion } from "react-bootstrap";

const MCQPractice = ({ flashcards, selectedType }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState({ correct: 0, incorrect: 0 });
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [review, setReview] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [options, setOptions] = useState([]);
    const [question, setQuestion] = useState(""); // Store question separately

    const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

    const generateOptions = (flashcard) => {
        let correctAnswer = "";
        let generatedQuestion = "";
        let options = [];

        if (selectedType === "word-reading") {
            correctAnswer = flashcard.reading;
            generatedQuestion = flashcard.word; // Question is the word
            options = flashcards
                .filter((card) => card.reading && card.reading !== correctAnswer)
                .map((card) => card.reading);
        } else if (selectedType === "reading-word") {
            correctAnswer = flashcard.word; // Correct answer is the word
            generatedQuestion = flashcard.reading; // Question is the reading
            options = flashcards
                .filter((card) => card.word && card.word !== correctAnswer)
                .map((card) => card.word);
        } else if (selectedType === "word-reading-meaning") {
            correctAnswer = flashcard.meaning; // Correct answer is the meaning
            generatedQuestion = `${flashcard.word} (${flashcard.reading})`; // Question is the word + reading
            options = flashcards
                .filter((card) => card.meaning && card.meaning !== correctAnswer)
                .map((card) => card.meaning);
        }

        // Handle case for no reading available
        if (!correctAnswer) {
            return { question: "None of the above", options: ["None of the above"], correctAnswer: "None of the above" };
        }

        // Ensure the correct answer is included in the options
        const randomOptions = shuffleArray(options).slice(0, 3);
        const allOptions = shuffleArray([...randomOptions, correctAnswer]);

        // Set the generated question
        setQuestion(generatedQuestion);

        return { options: allOptions, correctAnswer };
    };

    const handleAnswer = (answer) => {
        // Get the current flashcard
        const currentFlashcard = flashcards[currentIndex];

        // Correct answer is determined by the selected type
        let correctAnswer;
        if (selectedType === "reading-word") {
            correctAnswer = currentFlashcard.word;
        } else if (selectedType === "word-reading-meaning") {
            correctAnswer = currentFlashcard.meaning; // For word + reading → meaning
        } else {
            correctAnswer = currentFlashcard.reading; // Default case
        }

        // Check the selected answer against the correct answer
        if (answer === correctAnswer) {
            setScore((prevScore) => ({ ...prevScore, correct: prevScore.correct + 1 }));
        } else {
            setScore((prevScore) => ({ ...prevScore, incorrect: prevScore.incorrect + 1 }));
        }

        setReview((prevReview) => [
            ...prevReview,
            { ...currentFlashcard, correct: answer === correctAnswer },
        ]);
        setSelectedAnswer(answer); // Store the selected answer for display
    };

    const handleNextQuestion = () => {
        if (currentIndex + 1 < flashcards.length) {
            setCurrentIndex(currentIndex + 1);
            setSelectedAnswer(null); // Reset selected answer for next question
            setOptions([]); // Clear options so they will be generated again
            setQuestion(""); // Reset question for the next one
        } else {
            setShowResult(true);
        }
    };

    // Generate options only for the current question
    if (options.length === 0 && flashcards.length > 0) {
        const currentFlashcard = flashcards[currentIndex]; // Define currentFlashcard here
        const { options: newOptions } = generateOptions(currentFlashcard);
        setOptions(newOptions);
    }

    if (showResult) {
        return (
            <Container>
                <h3>MCQ Practice Completed</h3>
                <p>Total Questions: {flashcards.length}</p>
                <p>Correct Answers: {score.correct}</p>
                <p>Incorrect Answers: {score.incorrect}</p>
                <Accordion defaultActiveKey="0">
                    {review.map((item, index) => (
                        <Accordion.Item eventKey={index.toString()} key={index}>
                            <Accordion.Header>Question {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <p>Word: {item.word}</p>
                                <p>Reading: {item.reading}</p>
                                <p>Your Answer: {item.correct ? "Correct" : "Incorrect"}</p>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
                <Button onClick={() => window.location.reload()}>Restart</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h4>Question {currentIndex + 1} of {flashcards.length}</h4>
            <p>{question}</p>
            <Row>
                {options.map((option, index) => (
                    <Col xs={6} key={index} className="mb-3">
                        <Button
                            className={`w-100 ${selectedAnswer === option ? (option === (selectedType === "word-reading-meaning" ? flashcards[currentIndex].meaning : (selectedType === "reading-word" ? flashcards[currentIndex].word : flashcards[currentIndex].reading)) ? "btn-success" : "btn-danger") : "btn-primary"}`}
                            onClick={() => handleAnswer(option)}
                        >
                            {option}
                        </Button>
                    </Col>
                ))}
            </Row>
            {selectedAnswer && <Button onClick={handleNextQuestion}>Next Question</Button>}
        </Container>
    );
};

export default MCQPractice;
