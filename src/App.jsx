import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LearnSphereNavbar from "./components/pages/Navbar";
import { Container } from "react-bootstrap";
import FlashcardApp  from "./components/pages/vocabFlashcard/FlashcardApp";
import { KanjiApp } from "./components/pages/kanjiFlashcard/KanjiApp";
import { GrammarApp } from "./components/pages/GrammarFlashcard/GrammarApp";


function App() {
  return (
    <>
      <Router>
        <LearnSphereNavbar/>
        <Routes>
          <Route path="/" element={<FlashcardApp />} />{" "}
          {/* Default to Vocabulary */}
          <Route path="/vocabulary" element={<FlashcardApp />} />
          <Route path="/kanji" element={<KanjiApp />} />
          <Route path="/grammar" element={<GrammarApp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
