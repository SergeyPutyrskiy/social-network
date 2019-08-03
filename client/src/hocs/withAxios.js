import React from "react";
import isEqual from "lodash/isEqual";

import axios from "../api/config";

const withAxios = callback => WrappedComponent =>
  class WithAxios extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = Object.keys(callback(props)).reduce(
        (acc, key) => ({
          [key]: {
            data: null,
            error: null,
            loading: false
          }
        }),
        {}
      );
    }

    componentDidMount() {
      const requests = callback(this.props);
      const requestKeys = Object.keys(requests);

      requestKeys.forEach(key => {
        this.handleRequest(key);
      });
    }

    componentDidUpdate(prevProps) {
      const requests = callback(this.props);
      const prevRequests = callback(prevProps);
      const requestKeys = Object.keys(requests);

      requestKeys.forEach(key => {
        if (!isEqual(requests[key], prevRequests[key])) {
          this.handleRequest(key);
        }
      });
    }

    handleRequest = (key: string) => {
      const requests = callback(this.props);

      this.setState({
        [key]: {
          data: null,
          error: null,
          loading: true
        }
      });

      axios({
        ...requests[key]
      })
        .then(res => {
          this.setState({
            [key]: {
              loading: false,
              data: res.data.data,
              error: null
            }
          });
        })
        .catch(error => {
          this.setState({
            [key]: {
              loading: false,
              data: null,
              error
            }
          });
        });
    };

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };

export default withAxios;
