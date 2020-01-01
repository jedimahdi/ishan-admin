import { useContext } from 'react';
import { UserContext } from '../providers/user/user.provider';
import api from '../utils/api';

function useApi() {
  const { currentUser } = useContext(UserContext);

  api.defaults.headers.common['Authorization'] =
    'Bearer ' + currentUser.accessToken;
  return api;
}

export default useApi;
