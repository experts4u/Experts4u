// import axios from "axios";
import {CommonActions} from '@react-navigation/native';
import axios, {Axios} from 'axios';
import axiosRetry from 'axios-retry';
import Endpoints from 'Configs/API/Endpoints';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AccessToken_} from 'ReduxState/ReducerHelpers';
import {clearData} from 'ReduxState/Slices/UserSlice';
import Routes from 'RootNavigation/Routes';
import {StartLoader, StopLoader} from 'Utils/LoaderHelper';
import {Navigation_ref} from 'Utils/NavigationHelper';
import ToastMessage from 'Utils/ToastMessage';

export class RequestParams {
  constructor({endpoint, method, data, token}) {
    this.endpoint = endpoint;
    this.method = method;
    this.data = data;
    this.token = token;
    1;
  }
}
let info = new RequestParams({endpoint: ''});

export default function ({
  endpoint,
  method = 'GET',
  body = {},
  params,
  init = false,
  formData = false,
  Token = false,
}) {
  const [isLoading, setIsLoading] = useState(init);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const Dispatch = useDispatch();

  const [signalController, setSignalController] = useState(
    new AbortController(),
  );
  let token = useSelector(AccessToken_);

  const fetchData = async body_ => {
    try {
      setError(null);
      setIsLoading(true);

      let request = {
        url: Endpoints.baseUrl + endpoint,
        method,
      };
      if (method.toLowerCase?.() != 'get') {
        request.data = body;
      }
      if (Object.keys(body).length) {
        request.method = 'POST';
        request.data = body;
      }
      if (token) {
        request.headers = {
          Authorization: 'Bearer ' + token,
        };
      }
      if (formData) {
        request.headers = {
          ...request.headers,
          'Content-type': 'multipart/form-data',
        };
      }
      if (body_) {
        request.method = 'POST';
        request.data = body_;
      }

      console.log('request', JSON.stringify(request, null, 4));
      axiosRetry(axios, {retries: 3});
      let response = await axios(request);
      console.log('response', JSON.stringify(response.data, null, 4));

      setResponse(response.data);
      setIsLoading(false);
    } catch (e) {
      console.log(JSON.stringify('checkkk1', e));
      if (e.response && e.response.status == 401) {
        // Dispatch(clearData());
        // Navigation_ref.current?.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: Routes.AuthStack}],
        //   }),
        // );
      }
      if (e.response && e.response.status_code == 500) {
        ToastMessage.Error('Server Error. Please Try after Some Time');
        // Dispatch(clearData());

        // Navigation_ref.current?.dispatch(
        //   CommonActions.reset({
        //     index: 0,
        //     routes: [{name: Routes.AuthStack}],
        //   }),
        // );
      }
      setIsLoading(false);
      setResponse(null);
      setError(e?.response?.data);
      ToastMessage.Error(e?.response?.data?.message);
      console.log('e', JSON.stringify(e?.response?.data, null, 4));
      setError(e);
    }
  };

  const fetchPromise = body_ => {
    return new Promise(async (resolve, reject) => {
      try {
        let request = {
          url: Endpoints.baseUrl + endpoint,
          method,
        };
        if (method.toLowerCase?.() != 'get') {
          request.data = body;
        }
        if (Object.keys(body).length) {
          request.method = 'POST';
          request.data = body;
        }

        if ((Token = true)) {
          if (token) {
            request.headers = {
              Authorization: 'Bearer ' + token,
            };
          }
        }
        if (formData) {
          request.headers = {
            ...request.headers,
            'Content-type': 'multipart/form-data',
          };
        }
        if (body_) {
          request.method = 'POST';
          request.data = body_;
        }
        console.log('request', JSON.stringify(request, null, 4));
        let response = await axios(request);
        console.log('response', JSON.stringify(response.data, null, 4));
        resolve(response.data);
      } catch (e) {
        console.log('checkkk2', JSON.stringify(e.response.data));
        console.log('checkkk3', JSON.stringify(e.response));

        if (e.response && e.response.status == 401) {
          Dispatch(clearData());

          // Navigation_ref.current?.dispatch(
          //   CommonActions.reset({
          //     index: 0,
          //     routes: [{name: Routes.AuthStack}],
          //   }),
          // );
        }
        if (e.response && e.response.status == 500) {
          ToastMessage.Error('Server Error. Please Try after Some Time');
          Dispatch(clearData());

          Navigation_ref.current?.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{name: Routes.AuthStack}],
            }),
          );
        }
        // reject(e?.response?.data || e);
        reject(e?.response?.data);
      }
    });
  };

  useEffect(() => {
    if (init) {
      fetchData();
    }
  }, []);

  return {
    isLoading,
    error,
    response,
    fetchData,
    signalController,
    fetchPromise,
  };
}
