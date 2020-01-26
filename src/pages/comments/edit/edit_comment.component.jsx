import React from 'react';
import { withRouter } from 'react-router-dom';

import FormInput from '../../../components/form-input/form-input.component';
import Card from '../../../shared/components/UIElements/Card';

import API from '../../../utils/api';

class EditCommentPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      text: '',
      success: false
    };
  }

  componentDidMount() {
    API.get(`ins_comments/${this.props.match.params.commentId}`).then(res => {
      const { name, text } = res.data;
      this.setState({ name, text });
    });
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, text } = this.state;

    API.patch(`ins_comments/${this.props.match.params.commentId}`, {
      name,
      text
    }).then(res => {
      this.setState({ success: true });
    });
  };

  render() {
    return (
      <div className="edit-article my-container">
        <Card>
          {this.state.success ? (
            <div className="alert alert-success mt-4">Success</div>
          ) : null}
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h2>Edit Comment</h2>
          </div>

          <FormInput
            label="Name"
            name="name"
            value={this.state.name}
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

export default withRouter(EditCommentPage);
