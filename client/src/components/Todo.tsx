import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { List, Checkbox, Grid } from "semantic-ui-react";
import { toggleTodo } from "../state/actions";
import { ITodo } from "../utils/types";
import TodoModal from "./TodoModal";

interface Props {
  id: string;
}

export default function Todo({ id }: Props): ReactElement {
  const todo = useSelector((state: any) =>
    state.todos.find((todo: ITodo) => todo.id === id)
  );
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <List.Item>
        <List.Content>
          <Grid.Row
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h5 onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
              {todo.name}
            </h5>
            <Checkbox
              checked={todo.completed}
              onChange={() => {
                dispatch(toggleTodo({ id, completed: todo.completed }));
              }}
            />
          </Grid.Row>
        </List.Content>
      </List.Item>
      <TodoModal open={open} handleClose={() => setOpen(false)} todoId={id} />
    </>
  );
}
