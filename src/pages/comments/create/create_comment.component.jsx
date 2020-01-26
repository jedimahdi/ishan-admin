import React from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../../../components/form-input/form-input.component';
import Card from '../../../shared/components/UIElements/Card';

import API from '../../../utils/api';

class CreateCommentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      text: '',
      image: '',
      success: false,
      selectedFile: null
    };
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    let data = new FormData();
    data.append('file', this.state.selectedFile);
    data.append('name', this.state.name);
    data.append('text', this.state.text);

    // const { title, text } = this.state;

    API.post('ins_comments', data).then(res => {
      this.setState({ success: true });
    });

    this.setState({ name: '', text: '' });
  };

  onImageChange = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0],
      loaded: 0
    });
  };

  render() {
    return (
      <div className="create-comment my-container">
        <Card>
          {this.state.success ? (
            <div className="alert alert-success mt-4">Success</div>
          ) : null}
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Create Comment</h2>
          </div>

          <FormInput
            label="Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
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

          {/* <div className="form-group">
          <label htmlFor="imageInput">Image</label>
          <br />
          <input
            id="imageInput"
            type="file"
            name="file"
            onChange={this.onImageChange}
          />
        </div> */}
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              name="file"
              onChange={this.onImageChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose image file
            </label>
          </div>

          <div className="btn-group">
            <button onClick={this.handleSubmit} className="btn btn-dark">
              Create
            </button>
            <button
              onClick={() => this.props.history.push('/comments')}
              className="btn btn-danger"
            >
              Cancel
            </button>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(CreateCommentPage);
