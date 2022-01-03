import React, { ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Button, Icon, Input } from "semantic-ui-react";
import useInputState from "../hooks/useInputState";
import { addList } from "../state/actions";

export default function AddList(): ReactElement {
  const [open, setOpen] = React.useState(false);
  const name = useInputState();
  const dispatch = useDispatch();
  const currentBoardId = useSelector((state: any) => state.app.selectedBoard);

  const handleCreate = () => {
    if (!name.value) return;
    dispatch(addList({ name: name.value, boardId: currentBoardId }));
    name.handleReset();
    setOpen(false);
  };

  return (
    <Accordion styled>
      <Accordion.Title active={open} onClick={() => setOpen((prev) => !prev)}>
        <Icon name="plus" />
        Create a list
      </Accordion.Title>
      <Accordion.Content active={open}>
        <Input
          value={name.value}
          onChange={name.handleChange}
          fluid
          placeholder="Enter Name"
        />
        <Button
          basic
          onClick={handleCreate}
          style={{ marginTop: "1rem" }}
          primary
        >
          Create
        </Button>
      </Accordion.Content>
    </Accordion>
  );
}
