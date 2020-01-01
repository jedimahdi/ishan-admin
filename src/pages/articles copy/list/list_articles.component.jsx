import React from 'react';
import moment from 'jalali-moment';
import { withRouter } from 'react-router-dom';

import API from '../../../utils/api';

class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: []
    };
  }

  componentDidMount() {
    API.get('articles').then(res => {
      const articles = res.data;
      this.setState({ articles });
    });
  }

  handleDeleteArticle = articleId => {
    API.delete(`articles/${articleId}`).then(res => console.log);
    this.setState({
      articles: this.state.articles.filter(article => article._id !== articleId)
    });
  };

  render() {
    const { articles } = this.state;
    moment.locale('fa', { useGregorianParser: true });

    return (
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h2>Articles</h2>
          <div className="btn-toolbar mb-2 mb-md-0">
            <div className="btn-group mr-2">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() => this.props.history.push('/articles/create')}
              >
                Create Article
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Title</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {articles.map(article => (
                <tr key={article._id}>
                  <td>{article.title}</td>
                  <td>{moment(article.createdAt).format('YYYY/MM/DD')}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() =>
                          this.props.history.push(
                            `/articles/edit/${article._id}`
                          )
                        }
                      >
                        <i className="fa fa-pencil-square-o" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => this.handleDeleteArticle(article._id)}
                      >
                        <i className="fa fa-trash" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(ArticlesPage);
