import axios from "axios";
import { UNAUTHORIZED } from "http-status-codes";

import userApi from "./user";
import { store } from "../store";
import { BEARER } from "../constants/common";
import { getAuthTokensCompleted } from "../store/signin/actions";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === UNAUTHORIZED) {
      const { accessToken, refreshToken } = store.getState().user.data;
      const { data } = await userApi.reAuthenticate({
        accessToken,
        refreshToken
      });
      const dataWithBearer = {
        ...data,
        accessToken: `${BEARER} ${data.accessToken}`
      };

      store.dispatch(getAuthTokensCompleted(dataWithBearer));

      // eslint-disable-next-line no-param-reassign
      error.response.config.headers.Authorization = `${BEARER} ${
        data.accessToken
      }`;

      return axios(error.response.config);
    }

    return Promise.reject(error);
  }
);

export default instance;
