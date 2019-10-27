// @flow
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Grid, Search } from "semantic-ui-react";
import { compose } from "recompose";
import debounce from "lodash/debounce";
import { connect } from "react-redux";

import withSearch from "../../hocs/withSearch";

import friendsApi from "../../api/friends";
import FriendsList from "../../components/Friends/Friends";

type Profile = {
  data: {
    id: number,
    userName: string
  }
};

type Props = {
  profile: Profile,
  friendsRequest: any,
  searchLoading: boolean,
  handleResultSelect: Function,
  handleSearchChange: Function,
  searchResults: Function,
  searchValue: Object,
  userId: number
};

type State = {
  friends: Object[]
};

class Friends extends Component<Props, State> {
  state = {
    friends: []
  };

  async componentDidMount() {
    const { userId } = this.props;
    const res = await friendsApi.getFriends(userId);

    this.setState({
      friends: res.data.friends
    });
  }

  render() {
    const { friends } = this.state;
    const {
      searchLoading,
      handleResultSelect,
      handleSearchChange,
      searchResults,
      searchValue,
      userId
    } = this.props;

    return (
      <Grid>
        <Grid.Column width={5}>
          <Menu vertical size="lage">
            <Menu.Item link>
              <NavLink to={`/profile/${userId}`}>Profile</NavLink>
            </Menu.Item>
          </Menu>

          <Search
            loading={searchLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={debounce(handleSearchChange, 500, {
              leading: true
            })}
            results={searchResults}
            value={searchValue && searchValue.title}
            {...this.props}
          />

          <FriendsList
            friends={!!friends.length && friends}
            navigationPath="profile"
          />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.user.data.user.id,
  user: state.user.data.user
});

export default compose(
  connect(mapStateToProps),
  withSearch(
    data =>
      data.map(item => ({
        id: item.id,
        title: `${item.firstName} ${item.lastName}`,
        description: item.userName
      })),
    "/users"
  )
)(Friends);
