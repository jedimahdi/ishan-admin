import React from 'react';
import moment from 'jalali-moment';
import { withRouter } from 'react-router-dom';

const Table = ({ data, url, title, names, handleDeleteItem, history }) => {
  return (
    <div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
        <h2>{title}</h2>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={() => history.push(`/${url}/create`)}
            >
              Create {title}
            </button>
          </div>
        </div>
      </div>
      {data ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                {Object.keys(data[0]).map(key =>
                  names.includes(key) ? <th key={key}>{key}</th> : null
                )}
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item._id + new Date()}>
                  {Object.keys(item).map(key =>
                    names.includes(key) ? <td key={key}>{item[key]}</td> : null
                  )}
                  <td>{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => history.push(`/${url}/edit/${item._id}`)}
                      >
                        <i className="fa fa-pencil-square-o" />
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(item._id)}
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
      ) : (
        <div>No Data</div>
      )}
    </div>
  );
};

export default withRouter(Table);
