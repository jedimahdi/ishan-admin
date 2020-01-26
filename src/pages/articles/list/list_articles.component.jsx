import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';

import Table from '../../../components/table/table.component';
import Card from '../../../shared/components/UIElements/Card';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { API_BASE_URL } from '../../../shared/util/vars';
import { AuthContext } from '../../../shared/contexts/auth-context';
import './list_articles.styles.scss';

const ArticlesPage = ({ history }) => {
  const [articles, setArticles] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const responseData = await sendRequest(`${API_BASE_URL}articles`);
        setArticles(responseData);
      } catch (err) {}
    };

    fetchArticles();
  }, [sendRequest]);

  const handleDeleteItem = async id => {
    try {
      await sendRequest(`${API_BASE_URL}articles/${id}`, 'DELETE', null, {
        Authorization: 'Bearer ' + auth.token
      });
    } catch (err) {}
    setArticles(articles.filter(item => item._id !== id));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="my-container">
        <Card>
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {articles && (
            <Table
              data={articles}
              handleDeleteItem={handleDeleteItem}
              names={['title', 'author']}
              url="articles"
              title="Articles"
            />
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ArticlesPage);
