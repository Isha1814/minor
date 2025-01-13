import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const trace = useSelector(state => state.questions.trace); // Ensure `trace` is defined
  const result = useSelector(state => state.result.result); // Ensure `result` is defined
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof checked !== 'undefined') {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked, dispatch, trace]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked: i }));
  }

  const questions = apiData; // Use apiData directly

  if (isLoading) return <h3 className="text-light">Loading...</h3>;
  if (serverError) return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

  const currentQuestion = questions ? questions[trace] : null;

  return (
    <div className="questions">
      {currentQuestion ? (
        <>
          <h2 className="text-light">{currentQuestion.question}</h2>
          <ul key={currentQuestion.id}>
            {currentQuestion.options.map((q, i) => (
              <li key={i}>
                <input
                  type="radio"
                  value={false}
                  name="options"
                  id={`q${i}-option`}
                  onChange={() => onSelect(i)}
                />
                <label className="text-primary" htmlFor={`q${i}-option`}>{q}</label>
                <div className={`check ${result[trace] === i ? 'checked' : ''}`}></div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <h3 className="text-light">No questions available.</h3>
      )}
    </div>
  );
}
