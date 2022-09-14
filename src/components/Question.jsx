import { useContext } from "react";
import { QuizContext } from "../context/quiz";
import Options from "./Options";

import "./Question.css";

const Question = () => {
    const [quizState, dispatch] = useContext(QuizContext);
    const currentQuestion = quizState.questions[quizState.currentQuestion];

    const onSelectOption = (option) => {
        dispatch({
            type: "CHECK_ANSWER",
            // Através do PAYLOAD podemos enviar dados para o Contexto
            payload: {
                answer: currentQuestion.answer,
                option,
            },
        });
    };

    return (
        <div id="question">
            <p>
                Pergunta {quizState.currentQuestion + 1} de{" "}
                {quizState.questions.length}
            </p>
            <h2>{currentQuestion.question}</h2>
            <div id="options-container">
                {currentQuestion.options.map((option) => (
                    <Options
                        option={option}
                        answer={currentQuestion.answer}
                        selectOption={() => onSelectOption(option)}
                        key={option}
                    />
                ))}
            </div>
            {quizState.answerSelected && (
                <button onClick={() => dispatch({ type: "CHANGE_QUESTION" })}>
                    Continuar
                </button>
            )}
        </div>
    );
};

export default Question;
