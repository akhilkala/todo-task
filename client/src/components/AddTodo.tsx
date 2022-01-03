import React, { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { Button, Input, Modal } from "semantic-ui-react";
import useInputState from "../hooks/useInputState";
import { addTodo } from "../state/actions";

interface Props {
  open: boolean;
  handleClose: () => void;
  listId: string;
}

export default function AddTodo({
  open,
  handleClose,
  listId,
}: Props): ReactElement {
  const dispatch = useDispatch();
  const name = useInputState();
  const description = useInputState();

  return (
    <Modal onClose={handleClose} open={open} size="small">
      <Modal.Header>Add Todo</Modal.Header>
      <Modal.Content>
        <Input
          value={name.value}
          onChange={name.handleChange}
          fluid
          placeholder="Name"
        />
        <Input
          value={description.value}
          onChange={description.handleChange}
          style={{ marginTop: "1rem" }}
          fluid
          placeholder="Description"
        />
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          color="green"
          onClick={() => {
            dispatch(
              addTodo({
                name: name.value,
                description: description.value,
                listId,
              })
            );
            handleClose();
          }}
        >
          Add
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
