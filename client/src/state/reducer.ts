import { combineReducers } from "redux";
import { IBoard, IList, ITodo } from "../utils/types";
import {
  ADD_BOARD,
  ADD_LIST,
  ADD_TODO,
  DELETE_BOARD,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_BOARD_NAME,
  EDIT_LIST_NAME,
  FETCH_BOARDS,
  FETCH_LISTS,
  FETCH_TODOS,
  SET_CURRENT_BOARD,
  TOGGLE_TODO,
} from "./types";

const INITIAL_BOARD_STATE: IBoard[] = [];
const INITIAL_LIST_STATE: IList = [];
const INITIAL_TODO_STATE: ITodo = [];

const INITIAL_APP_STATE = {
  selectedBoard: null,
};

interface IAction {
  type: string;
  payload?: any;
}

const appReducer = (state = INITIAL_APP_STATE, action: IAction) => {
  switch (action.type) {
    case SET_CURRENT_BOARD:
      return { ...state, selectedBoard: action.payload };

    default:
      return state;
  }
};

const boardReducer = (state = INITIAL_BOARD_STATE, action: IAction) => {
  switch (action.type) {
    case FETCH_BOARDS:
      return action.payload;

    case ADD_BOARD:
      return [...state, action.payload];

    case DELETE_BOARD:
      return state.filter((board: IBoard) => board.id !== action.payload);

    case EDIT_BOARD_NAME:
      return state;

    default:
      return state;
  }
};

const listReducer = (state = INITIAL_LIST_STATE, action: IAction) => {
  switch (action.type) {
    case FETCH_LISTS:
      return action.payload;

    case ADD_LIST:
      return [...state, action.payload];

    case DELETE_LIST:
      return state.filter((list: IList) => list.id !== action.payload);

    case EDIT_LIST_NAME:
      return state.map((list: IList) =>
        list.id === action.payload.id
          ? { ...list, name: action.payload.name }
          : list
      );

    default:
      return state;
  }
};

const todoReducer = (state = INITIAL_TODO_STATE, action: IAction) => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload;

    case ADD_TODO:
      return [...state, action.payload];

    case DELETE_TODO:
      return state.filter((todo: ITodo) => todo.id !== action.payload);

    case TOGGLE_TODO:
      return state.map((todo: ITodo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    default:
      return state;
  }
};

export default combineReducers({
  app: appReducer,
  boards: boardReducer,
  lists: listReducer,
  todos: todoReducer,
});
