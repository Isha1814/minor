import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from 'axios';
import * as Action from '../redux/question_reducer';

export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({ isLoading: false, apiData: [], serverError: null });



  useEffect(() => {
    const fetchQuestions = async () => {
      setGetData(prev => ({ ...prev, isLoading: true }));
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions/tests`);
        const { questions } = response.data;

        if (questions.length > 0) {
          setGetData(prev => ({ ...prev, isLoading: false, apiData: questions }));
          dispatch(Action.startExamAction({ question: questions }));
        } else {
          throw new Error("No Questions Available");
        }
      } catch (error) {
        setGetData(prev => ({ ...prev, isLoading: false, serverError: error.message }));
      }
    };

    fetchQuestions();
  }, [dispatch]);

  return [getData, setGetData];
};

/** MoveAction Dispatch function */
export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction()); /** increase trace by 1 */
  } catch (error) {
    console.error(error);
  }
};

/** PrevAction Dispatch function */
export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevAction()); /** decrease trace by 1 */
  } catch (error) {
    console.error(error);
  }
};
