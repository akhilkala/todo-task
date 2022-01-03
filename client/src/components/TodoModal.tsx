import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal } from "semantic-ui-react";
import { deleteTodo } from "../state/actions";
import { ITodo } from "../utils/types";

interface Props {
  open: boolean;
  handleClose: () => void;
  todoId: string;
}

export default function TodoModal({
  open,
  handleClose,
  todoId,
}: Props): ReactElement {
  const todo = useSelector((state: any) =>
    state.todos.find((todo: ITodo) => todo.id === todoId)
  );
  const dispatch = useDispatch();

  return (
    <Modal size="tiny" dimmer="blurring" open={open} onClose={handleClose}>
      <Modal.Header as="h3">{todo.name}</Modal.Header>
      <Modal.Content>
        <p>{todo.description}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => {
            dispatch(deleteTodo(todoId));
            handleClose();
          }}
          negative
        >
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
