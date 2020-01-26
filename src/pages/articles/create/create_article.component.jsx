import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import ErrorModal from '../../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/LoadingSpinner';
import Input from '../../../shared/components/FormElements/Input';
import Button from '../../../shared/components/FormElements/Button';
import Card from '../../../shared/components/UIElements/Card';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/contexts/auth-context';
import { API_BASE_URL } from '../../../shared/util/vars';

const CreateArticlePage = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputChangeHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      text: {
        value: '',
        isValid: false
      },
      file: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const history = useHistory();

  const articleSubmitHandler = async event => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('text', formState.inputs.text.value);
      formData.append('file', formState.inputs.file.value);

      await sendRequest(`${API_BASE_URL}articles`, 'POST', formData, {
        Authorization: 'Bearer ' + auth.token
      });
      history.push('/articles');
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <div className="create-article my-container">
        <Card>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Create Article</h2>
          </div>

          <form onSubmit={articleSubmitHandler}>
            {isLoading && <LoadingSpinner asOverlay />}
            <Input
              id="title"
              element="input"
              type="text"
              label="Title"
              onInput={inputChangeHandler}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a valid title"
            />

            <Input
              id="text"
              element="textarea"
              label="Text"
              onInput={inputChangeHandler}
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid text (at least 5 characters)"
            />

            <ImageUpload
              id="file"
              onInput={inputChangeHandler}
              errorText="Please provide a image."
            />

            <Button inverse type="submit" disabled={!formState.isValid}>
              Create
            </Button>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CreateArticlePage;
