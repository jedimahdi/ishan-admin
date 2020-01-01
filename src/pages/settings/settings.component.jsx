import React from 'react';
import MultiSelect from '@khanacademy/react-multi-select';

import FormInput from '../../components/form-input/form-input.component';

import API from '../../utils/api';

class SettingsPage extends React.Component {
  constructor() {
    super();

    this.state = {
      settings: [],
      articles: [],
      selected_articles: [],
      ins_comments: [],
      selected_ins_comments: [],
      key: '',
      value: ''
    };
  }

  componentDidMount() {
    API.get('settings').then(res => {
      const settings = res.data;
      this.setState({ settings });

      const a = settings.find(setting => setting.key === 'homepage_articles');
      if (a.value !== '') {
        this.setState({ selected_articles: a.value.split(',') });
      }

      const c = settings.find(
        setting => setting.key === 'homepage_instructor_comments'
      );
      if (c.value !== '') {
        this.setState({ selected_ins_comments: c.value.split(',') });
      }
    });

    API.get('articles').then(res => {
      const articles = res.data.map(article => ({
        label: article.title,
        value: article._id
      }));

      this.setState({ articles });
    });

    API.get('ins_comments').then(res => {
      const ins_comments = res.data.map(comment => ({
        label: comment.name,
        value: comment._id
      }));
      this.setState({ ins_comments });
    });
  }

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  handleDeleteSetting = id => {
    API.delete(`settings/${id}`).then(console.log);

    this.setState({
      settings: this.state.settings.filter(setting => setting._id !== id)
    });
  };

  handleSettingInputChange = event => {
    const { value, name } = event.target;

    let { settings } = this.state;

    settings = settings.map(setting => {
      if (setting.key === name) {
        setting.value = value;
      }
      return setting;
    });

    this.setState({ settings });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { settings } = this.state;

    console.log(settings);

    API.patch('settings', { settings }).then(console.log);

    // axios
    //   .post(`https://jsonplaceholder.typicode.com/users`, { user })
    //   .then(res => {
    //     console.log(res);
    //     console.log(res.data);
    //   });
  };

  handleCreateSettings = event => {
    event.preventDefault();

    const setting = {
      key: this.state.key,
      value: this.state.value
    };

    API.post('settings', { ...setting }).then(res => console.log(res));
    this.setState({
      settings: [...this.state.settings, setting],
      key: '',
      value: ''
    });
  };

  onSelectArticleChange = selected_articles => {
    this.setState({ selected_articles });

    let set = this.state.settings;
    set.find(s => s.key === 'homepage_articles').value = selected_articles.join(
      ','
    );

    this.setState({ settings: set });
  };

  onSelectInsCommentChange = selected_ins_comments => {
    this.setState({ selected_ins_comments });

    let set = this.state.settings;
    set.find(
      s => s.key === 'homepage_instructor_comments'
    ).value = selected_ins_comments.join(',');

    this.setState({ settings: set });
  };

  render() {
    return (
      <div className="settings">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Settings</h2>
        </div>

        {this.state.settings.map(setting => (
          <div className="row align-items-center" key={setting._id}>
            <div className="col-md-12">
              <FormInput
                label={setting.key.split('_').join(' ')}
                name={setting.key}
                onChange={this.handleSettingInputChange}
                value={
                  this.state.settings.find(s => s.key === setting.key).value
                }
                readOnly={setting.readonly}
              />
            </div>
            {/* <div className="col-md-1">
              <button
                type="button"
                className="btn btn-light"
                onClick={() => this.handleDeleteSetting(setting._id)}
              >
                <i className="fa fa-window-close"></i>
              </button>
            </div> */}
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="selectArticle">Select articles for homepage</label>
          <MultiSelect
            options={this.state.articles}
            selected={this.state.selected_articles}
            onSelectedChanged={this.onSelectArticleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="selectInsComment">
            Select instructor comments for homepage
          </label>

          <MultiSelect
            options={this.state.ins_comments}
            selected={this.state.selected_ins_comments}
            onSelectedChanged={this.onSelectInsCommentChange}
          />
        </div>

        <button onClick={this.handleSubmit} className="btn btn-dark">
          Update Settings
        </button>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Create New Settings</h2>
        </div>

        <div className="row">
          <div className="col-md-6">
            <FormInput
              label="Settings key"
              name="key"
              onChange={this.handleChange}
              value={this.state.key}
            />
          </div>
          <div className="col-md-6">
            <FormInput
              label="Settings value"
              name="value"
              onChange={this.handleChange}
              value={this.state.value}
            />
          </div>
        </div>
        <button
          onClick={this.handleCreateSettings}
          className="btn btn-dark mb-4"
        >
          Create
        </button>
      </div>
    );
  }
}

export default SettingsPage;
