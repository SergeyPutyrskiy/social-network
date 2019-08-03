// @flow
import React, { Fragment } from "react";
import get from "lodash/get";

type Props = {
  profile: Object
};

const getAvatarAlias = (firstName, lastName) =>
  `${firstName.slice(0, 1)}${lastName.slice(0, 1)}`;

const UserInfo = ({ profile }: Props) => (
  <Fragment container justify="center" alignItems="center">
    {getAvatarAlias(
      get(profile, "firstName", ""),
      get(profile, "lastName", "")
    )}
    {get(profile, "userName", "")}
  </Fragment>
);

export default UserInfo;
