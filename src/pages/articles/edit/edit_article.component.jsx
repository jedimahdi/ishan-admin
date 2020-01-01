import React from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../../../components/form-input/form-input.component';

import API from '../../../utils/api';

class EditArticlePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
      success: false
    };
  }

  componentDidMount() {
    API.get(`articles/${this.props.match.params.articleId}`).then(res => {
      const { title, text } = res.data;
      this.setState({ title, text });
    });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { title, text } = this.state;

    API.patch(`articles/${this.props.match.params.articleId}`, {
      title,
      text
    }).then(res => {
      this.setState({ success: true });
    });
  };

  render() {
    return (
      <div className="edit-article">
        {this.state.success ? (
          <div className="alert alert-success mt-4">Success</div>
        ) : null}
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Edit Article</h2>
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
            rows="6"
          />
        </div>

        <div className="btn-group">
          <button onClick={this.handleSubmit} className="btn btn-dark">
            Update
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

export default withRouter(EditArticlePage);
