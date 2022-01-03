import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Confirm,
  Divider,
  Grid,
  Header,
  Input,
  Tab,
} from "semantic-ui-react";
import Board from "./components/Board";
import useInputState from "./hooks/useInputState";
import {
  addBoard,
  deleteBoard,
  fetchData,
  setCurrentBoard,
} from "./state/actions";
import { IBoard } from "./utils/types";

function App() {
  const boardName = useInputState();
  const dispatch = useDispatch();
  const boards = useSelector((state: any) => state.boards);
  const currentBoardId = useSelector((state: any) => state.app.selectedBoard);
  const currentBoardIndex =
    boards.findIndex((board: IBoard) => board.id === currentBoardId) || 0;
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(fetchData());
  }, []);

  const getPanes = () => {
    return boards.map((board: IBoard) => ({
      id: board.id,
      menuItem: board.name,
      render: () => (
        <Tab.Pane key={board.id}>
          <Board id={board.id} />
        </Tab.Pane>
      ),
    }));
  };

  React.useEffect(() => {
    if (boards.length !== 1) return;
    dispatch(setCurrentBoard(boards[0].id));
  }, [boards]);

  const addNewBoard = () => {
    if (!boardName.value) return;
    dispatch(addBoard(boardName.value));
    boardName.handleReset();
  };

  return (
    <>
      <Header
        as="h1"
        block
        style={{ background: "rgb(22, 120, 194)", color: "#fff" }}
      >
        Todo App
      </Header>
      <div className="add-board">
        <Header as="h3">Add Board</Header>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Grid.Row stretched>
            <Input
              value={boardName.value}
              onChange={boardName.handleChange}
              placeholder="Name"
              className="add-board-input"
            />
            <Button
              onClick={addNewBoard}
              style={{ marginLeft: "1rem" }}
              primary
            >
              Add
            </Button>
          </Grid.Row>
          {!!boards.length && (
            <Button onClick={() => setConfirmOpen(true)} color="red">
              Delete -{" "}
              {boards[currentBoardIndex] ? boards[currentBoardIndex].name : ""}
            </Button>
          )}
        </div>

        <Divider hidden={!boards.length} />
      </div>
      <Tab
        onTabChange={(e, data) => {
          //@ts-ignore
          dispatch(setCurrentBoard(data.panes[data.activeIndex].id));
        }}
        menu={{ fluid: true, tabular: true }}
        panes={getPanes()}
      />
      <Confirm
        centered={false}
        open={confirmOpen}
        size="tiny"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          dispatch(dispatch(deleteBoard(currentBoardId)));
        }}
      />
    </>
  );
}

export default App;
