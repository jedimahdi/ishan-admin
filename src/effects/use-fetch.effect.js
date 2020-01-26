import { useState, useEffect, useContext } from 'react';
import { useHttpClient } from '../shared/hooks/http-hook';
import { API_BASE_URL } from '../shared/util/vars';
import { AuthContext } from '../shared/contexts/auth-context';

function useFetch(url) {
  const [data, setData] = useState(null);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responseData = await sendRequest(`${API_BASE_URL}${url}`);
        setData(responseData);
      } catch (err) {}
    };

    fetchArticles();
  }, [sendRequest, url]);

  const handleDeleteItem = async id => {
    try {
      await sendRequest(`${API_BASE_URL}${url}/${id}`, 'DELETE', null, {
        Authorization: 'Bearer ' + auth.token
      });
    } catch (err) {}
    setData(data.filter(item => item._id !== id));
    // api.delete(`${url}/${dataId}`).then(console.log);
  };

  console.log(data);
  return { data, handleDeleteItem, isLoading, error, clearError };
}

export default useFetch;
