import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../../shared/components/UIElements/Card';
import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { API_BASE_URL } from '../../../shared/util/vars';

const EditArticlePage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedArticle, setLoadedArticle] = useState();
  const articleId = useParams().articleId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      text: {
        value: '',
        isValid: false
      }
    },
    false
  );

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const responseData = await sendRequest(
          `${API_BASE_URL}articles/${articleId}`
        );
        setLoadedArticle(responseData);
        setFormData(
          {
            title: { value: responseData.title, isValid: true },
            text: { value: responseData.text, isValid: true }
          },
          true
        );
      } catch (err) {}
    };

    fetchArticle();
  }, [sendRequest, articleId, setFormData]);

  const updateSubmitHandler = async event => {
    event.preventDefault();
    try {
      await sendRequest(
        `${API_BASE_URL}articles/${articleId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          text: formState.inputs.text.value
        }),
        {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      );
      history.push('/articles');
    } catch (err) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedArticle && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && loadedArticle && (
        <div className="edit-article my-container">
          <Card>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h2>Edit Article</h2>
            </div>

            <form onSubmit={updateSubmitHandler}>
              <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title."
                onInput={inputHandler}
                initialValue={loadedArticle.title}
                initialValid={true}
              />

              <Input
                id="text"
                element="textarea"
                label="Text"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid text (min. 5 characters)."
                onInput={inputHandler}
                initialValue={loadedArticle.text}
                initialValid={true}
              />
              <Button type="submit" disabled={!formState.isValid}>
                UPDATE ARTICLE
              </Button>
            </form>
          </Card>
        </div>
      )}
    </React.Fragment>
  );
};

export default EditArticlePage;
