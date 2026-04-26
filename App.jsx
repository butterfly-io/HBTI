import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import { questions } from "./data/qustions";
import { calculateResult } from "./utils/resultCaluculator";

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 200 : -200,
    scale: 0.95,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 25,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -200 : 200,
    scale: 0.95,
    transition: {
      duration: 0.2,
    },
  }),
};

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [result, setResult] = useState(null);
  const [direction, setDirection] = useState(1);

  const handleStart = () => {
    setDirection(1);
    setCurrentPage("quiz");
  };

  const handleComplete = (answers) => {
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
    setDirection(1);
    setCurrentPage("result");
  };

  const handleRestart = () => {
    setDirection(-1);
    setResult(null);
    setCurrentPage("home");
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait" custom={direction}>
        {currentPage === "home" && (
          <motion.div
            key="home"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Home onStart={handleStart} />
          </motion.div>
        )}

        {currentPage === "quiz" && (
          <motion.div
            key="quiz"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Quiz questions={questions} onComplete={handleComplete} />
          </motion.div>
        )}

        {currentPage === "result" && (
          <motion.div
            key="result"
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Result result={result} onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;