import React from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../../../components/form-input/form-input.component';

import API from '../../../utils/api';

class CreateArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      image: '',
      success: false
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { title, text } = this.state;

    API.post('articles', { title, text }).then(res => {
      this.setState({ success: true });
    });

    this.setState({ title: '', text: '' });
  };

  onImageChange = event => {
    console.log(event.target.files[0]);
  };

  render() {
    return (
      <div className="create-article">
        {this.state.success ? (
          <div className="alert alert-success mt-4">Success</div>
        ) : null}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Create Article</h2>
        </div>

        <FormInput
          label="Title"
          name="title"
          value={this.state.title}
          handleChange={this.handleChange}
        />

        <div className="form-group">
          <label htmlFor="textInput">Text</label>
          <textarea
            className="form-control"
            name="text"
            value={this.state.text}
            onChange={this.handleChange}
            id="textInput"
            rows="3"
          />
        </div>

        <div className="form-group">
          <input type="file" name="file" onChange={this.onImageChange} />
        </div>

        <div className="btn-group">
          <button onClick={this.handleSubmit} className="btn btn-dark">
            Create
          </button>
          <button
            onClick={() => this.props.history.push('/articles')}
            className="btn btn-danger"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateArticlePage);
