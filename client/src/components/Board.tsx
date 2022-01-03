import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { Grid } from "semantic-ui-react";
import { IList } from "../utils/types";
import AddList from "./AddList";
import List from "./List";
import { useMediaQuery } from "react-responsive";

interface Props {
  id: string;
}

export default function Board({ id }: Props): ReactElement {
  const lists = useSelector((state: any) =>
    state.lists.filter((list: IList) => list.board.id === id)
  );

  const fourColumns = useMediaQuery({
    query: "(max-width: 1490px)",
  });

  const threeColumns = useMediaQuery({
    query: "(max-width: 1150px)",
  });

  const twoColumns = useMediaQuery({
    query: "(max-width: 700px)",
  });

  const oneColumn = useMediaQuery({
    query: "(max-width: 420px)",
  });

  const getColumns = () => {
    if (oneColumn) return 1;
    if (twoColumns) return 2;
    if (threeColumns) return 3;
    if (fourColumns) return 4;
    return 5;
  };

  return (
    <Grid columns={getColumns()}>
      {lists.map((list: IList) => (
        <Grid.Column key={list.id}>
          <List id={list.id} name={list.name} />
        </Grid.Column>
      ))}
      <Grid.Column>
        <AddList />
      </Grid.Column>
    </Grid>
  );
}
