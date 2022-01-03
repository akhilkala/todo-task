import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Header,
  List,
  Icon,
  Dropdown,
  Grid,
  Input,
  Confirm,
  Button,
} from "semantic-ui-react";
import useInputState from "../hooks/useInputState";
import { deleteList, editListName } from "../state/actions";
import { ITodo } from "../utils/types";
import AddTodo from "./AddTodo";
import Todo from "./Todo";

interface Props {
  id: string;
  name: string;
}

export default function ListUI({ id, name: initialName }: Props): ReactElement {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [addOpen, setOddOpen] = React.useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state: any) =>
    state.todos.filter((todo: ITodo) => todo.list.id === id)
  );
  const name = useInputState(initialName);

  return (
    <>
      <Card style={{ padding: "1rem" }}>
        <Header as="h3" dividing>
          <Grid.Row
            style={{ display: "flex", justifyContent: "space-between" }}
            divided
          >
            <Input
              transparent
              value={name.value}
              onChange={(e) => {
                name.handleChange(e);
                dispatch(editListName({ id, name: e.target.value }));
              }}
            />
            <Icon
              onClick={() => setConfirmOpen(true)}
              style={{ cursor: "pointer", transform: "TranslateX(5px)" }}
              name="trash alternate outline"
            />
          </Grid.Row>
        </Header>
        <List divided relaxed>
          {todos.map((todo: ITodo) => (
            <Todo id={todo.id} />
          ))}
          <Button
            onClick={() => setOddOpen(true)}
            style={{ width: "100%" }}
            basic
            primary
          >
            Add Todo
          </Button>
        </List>
      </Card>
      <Confirm
        centered={false}
        open={confirmOpen}
        size="tiny"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          dispatch(deleteList(id));
        }}
      />
      <AddTodo
        listId={id}
        open={addOpen}
        handleClose={() => setOddOpen(false)}
      />
    </>
  );
}
