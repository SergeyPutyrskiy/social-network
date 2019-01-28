// @flow
import React from "react";
import get from "lodash/get";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";

type Props = {
  profile: Object,
  classes: Object
};

const styles = {
  avatar: {
    margin: 10
  },
  purpleAvatar: {
    margin: 10,
    color: "#fff",
    backgroundColor: deepPurple[500]
  }
};

const getAvatarAlias = (firstName, lastName) =>
  `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`;

const UserInfo = ({ classes, profile }: Props) => (
  <Grid container justify="center" alignItems="center">
    <Avatar className={classes.purpleAvatar}>
      {getAvatarAlias(
        get(profile, "data.firstName", ""),
        get(profile, "data.lastName", "")
      )}
    </Avatar>
    {get(profile, "data.userName", "")}
  </Grid>
);

export default withStyles(styles)(UserInfo);
