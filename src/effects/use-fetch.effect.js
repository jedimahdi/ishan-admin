import { useState, useEffect } from 'react';
import useApi from './use-api';

function useFetch(url) {
  const [data, setData] = useState(null);
  const api = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get(url);
      setData(res.data);
    };

    fetchData();
  }, [url, api]);

  const handleDeleteItem = dataId => {
    api.delete(`${url}/${dataId}`).then(console.log);
    setData(data.filter(item => item._id !== dataId));
  };

  return { data, handleDeleteItem };
}

export default useFetch;
