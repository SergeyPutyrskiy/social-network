import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle } from "recompose";

import { getProfileStart } from "../middleware/profile/actions";

const withUserProfile = WrappedComponent => props => (
  <WrappedComponent {...props} />
);

const mapStateToProps = state => ({
  profile: state.profile
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getProfileStart }, dispatch);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const { getProfileStart } = this.props;

      getProfileStart();
    }
  }),
  withUserProfile
);
