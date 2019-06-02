import React from "react";
import { Loader, Dimmer } from "semantic-ui-react";
import { branch, renderComponent } from "recompose";

const Spinner = () => (
  <Dimmer active inverted>
    <Loader size="big" />
  </Dimmer>
);

export default callback =>
  branch(props => callback(props), renderComponent(Spinner));
