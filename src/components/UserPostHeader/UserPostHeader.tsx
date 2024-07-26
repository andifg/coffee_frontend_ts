import "./UserPostHeader.scss";

import Grid from "@mui/material/Unstable_Grid2";

import UserAvatar from "../UserAvatar/UserAvatar";
import theme from "../../theme";
import { useCalculateTimeDiffFromUuid } from "./useCalculateTimeDiffFromUuid";

interface CofeeHeaderProps {
  rightSideContent: JSX.Element;
  username: string;
  uuid: string;
}

const UserPostHeader = (props: CofeeHeaderProps) => {
  // console.log("Rerender UserPostHeader");

  const timeDiffString = useCalculateTimeDiffFromUuid(props.uuid);

  return (
    <div className="user-post-wrapper">
      <Grid container>
        <Grid className="user-post-header-left" xs={1}>
          <UserAvatar given_name={props.username} />
        </Grid>
        <Grid className="user-post-header-middle" xs={9}>
          <div className="user-post-header-username">{props.username}</div>
          <div
            className="user-post-header-time"
            style={{ color: theme.palette.secondary.main }}
          >
            {timeDiffString}
          </div>
        </Grid>
        <Grid className="user-post-header-right" xs={2}>
          {props.rightSideContent}
        </Grid>
      </Grid>
    </div>
  );
};

export { UserPostHeader };
