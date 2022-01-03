import {
  ADD_BOARD,
  ADD_LIST,
  ADD_TODO,
  DELETE_BOARD,
  DELETE_LIST,
  DELETE_TODO,
  EDIT_LIST_NAME,
  FETCH_BOARDS,
  FETCH_LISTS,
  FETCH_TODOS,
  SET_CURRENT_BOARD,
  TOGGLE_TODO,
} from "./types";
import { Dispatch } from "redux";
import { APIService } from "../utils/APIService";
import { IList, ITodo } from "../utils/types";

type Thunk<T = {}> = (
  args?: T
) => (dispatch: Dispatch<any>, getState: () => any, api: APIService) => void;

const action = (type: string, payload?: any) => ({ type, payload });

export const fetchData: Thunk = () => async (dispatch, getState, api) => {
  const [boards, lists, todos] = await Promise.all([
    api.get("/board"),
    api.get("/list"),
    api.get("/todo"),
  ]);
  dispatch(action(FETCH_BOARDS, boards));
  dispatch(action(FETCH_LISTS, lists));
  dispatch(action(FETCH_TODOS, todos));
  dispatch(action(SET_CURRENT_BOARD, boards[0].id));
};

export const setCurrentBoard = (id: string) => action(SET_CURRENT_BOARD, id);

export const addBoard: Thunk<string> =
  (name) => async (dispatch, getState, api) => {
    const board = await api.post("/board", { name }, {}, true);
    dispatch(action(ADD_BOARD, board));
  };

export const deleteBoard: Thunk = (id) => async (dispatch, getState, api) => {
  await api.deleteCall("/board", { id }, true);
  const { lists, todos } = getState();
  lists
    .filter((list: IList) => list.board.id === id)
    .forEach((list: IList) => deleteList(list.id));
  todos
    .filter((todo: ITodo) => todo.list.board === id)
    .forEach((todo: ITodo) => deleteTodo(todo.id));

  dispatch(action(DELETE_BOARD, id));
};

export const addList: Thunk<{ name: string; boardId: string }> =
  (args) => async (dispatch, getState, api) => {
    const list = await api.post(
      "/list",
      { name: args?.name, board: args?.boardId },
      {},
      true
    );
    dispatch(action(ADD_LIST, list));
  };

export const deleteList: Thunk<string> =
  (id) => async (dispatch, getState, api) => {
    await api.deleteCall("/list", { id }, true);
    const { todos } = getState();
    todos
      .filter((todo: ITodo) => todo.list.id === id)
      .forEach((todo: ITodo) => deleteTodo(todo.id));
    dispatch(action(DELETE_LIST, id));
  };

export const editListName: Thunk<{ id: string; name: string }> =
  (args) => async (dispatch, getState, api) => {
    await api.patch(`/list/${args?.id}/`, { name: args?.name });
    dispatch(
      action(EDIT_LIST_NAME, {
        id: args?.id,
        name: args?.name,
      })
    );
  };

export const addTodo: Thunk<{
  name: string;
  description: string;
  listId: string;
}> = (args) => async (dispatch, getState, api) => {
  const todo = await api.post(
    "/todo",
    { name: args?.name, list: args?.listId, description: args?.description },
    {},
    true
  );
  dispatch(action(ADD_TODO, todo));
};

export const deleteTodo: Thunk = (id) => async (dispatch, getState, api) => {
  await api.deleteCall("/todo", { id }, true);
  dispatch(action(DELETE_TODO, id));
};

export const toggleTodo: Thunk<{ id: string; completed: boolean }> =
  (args) => async (dispatch, getState, api) => {
    await api.patch(`/todo/${args?.id}`, { completed: !args?.completed });
    dispatch(action(TOGGLE_TODO, args?.id));
  };
