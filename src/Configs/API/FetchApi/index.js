import {CommonActions} from '@react-navigation/native';
import axios from 'axios';
import {store} from 'ReduxState';
import {StartLoader, StopLoader} from 'Utils/LoaderHelper';
import ToastMessage from 'Utils/ToastMessage';
import Endpoints from '../Endpoints';
import {Navigation_ref} from 'Utils/NavigationHelper';

export const APIErrorHandler = obj => {};
export const FetchApi = (endpoint, data, loader = true, file = false) => {
  return new Promise(async (resolve, reject) => {
    let options = {
      'Content-Type': 'application/json',
    };
    let fileOptions = {
      'Content-Type': 'multipart/form-data',
    };
    if (
      store.getState().user.token &&
      endpoint != Endpoints.login &&
      endpoint != Endpoints.register &&
      !file
    ) {
      options['Authorization'] = 'Bearer ' + store.getState().user.token;
    }
    if (
      store.getState().user.token &&
      endpoint != Endpoints.login &&
      endpoint != Endpoints.register &&
      file
    ) {
      fileOptions['Authorization'] = 'Bearer ' + store.getState().user.token;
    }

    try {
      loader ? StartLoader() : {};
      let resp = await axios({
        headers: file ? fileOptions : options,
        method: data ? 'POST' : 'GET',
        baseURL: Endpoints.ServerUrl,
        url: endpoint,
        data: data ? data : null,
      });
      loader ? StopLoader() : null;
      if (!resp.data.status) {
        if (typeof resp.data.message == 'object') {
          let errMsg = resp.data.message[Object.keys(resp.data.message)[0]][0];
          ToastMessage.Error(errMsg);
        } else {
          ToastMessage.Error(JSON.stringify(resp.data.message));
        }
        reject(resp.data);
      } else {
        console.log('step2');
        resolve(resp.data);
      }
    } catch (e) {
      StopLoader();
      if (e.response && e.response.data && e.response.data.message) {
        ToastMessage.Error(e.response.data.message);
      }
      console.log('e', JSON.stringify(e.response));
      if (e.response && e.response.status == 401) {
        Navigation_ref.current?.dispatch(
          CommonActions.reset({index: 0, routes: [{name: Routes.Login}]}),
        );
      }
      if (e.response && e.response.status == 500) {
        ToastMessage.Error('Server Error. Please Try after Some Time');

        Navigation_ref.current?.dispatch(
          CommonActions.reset({index: 0, routes: [{name: Routes.Login}]}),
        );
      }
      reject(e);
    }
  });
};
