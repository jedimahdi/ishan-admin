import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import useForminput from '../../../effects/use-form-input.effect';

import FormInput from '../../../components/form-input/form-input.component';

import auth_api from '../../../utils/api_auth';

const CreateArticlePage = ({ history }) => {
  const title = useForminput('');
  const text = useForminput('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', selectedFile);
    data.append('title', title.value);
    data.append('text', text.value);

    auth_api.post('articles', data).then(res => {
      setSuccess(true);
    });
  };

  const onImageChange = event => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="create-article">
      {success ? <div className="alert alert-success mt-4">Success</div> : null}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2>Create Article</h2>
      </div>

      <FormInput label="Title" name="title" {...title} />

      <div className="form-group">
        <label htmlFor="textInput">Text</label>
        <textarea
          className="form-control"
          name="text"
          {...text}
          id="textInput"
          rows="3"
        />
      </div>

      <div className="custom-file mb-4">
        <input
          type="file"
          className="custom-file-input"
          id="customFile"
          name="file"
          onChange={onImageChange}
        />
        <label className="custom-file-label" htmlFor="customFile">
          Choose image file
        </label>
      </div>

      <div className="btn-group">
        <button onClick={handleSubmit} className="btn btn-dark">
          Create
        </button>
        <button
          onClick={() => history.push('/articles')}
          className="btn btn-danger"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default withRouter(CreateArticlePage);
