import React, { useState } from 'react';
import moment from 'jalali-moment';
import { withRouter } from 'react-router-dom';

import Modal from '../../shared/components/UIElements/Modal';
import Button from '../../shared/components/FormElements/Button';

const Table = ({ data, url, title, names, handleDeleteItem, history }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteModalId, setDeleteModalId] = useState(null);

  const showDeleteWarningHandler = id => {
    setShowConfirmModal(true);
    setDeleteModalId(id);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
    setDeleteModalId(null);
  };

  const confirmDeleteHandler = () => {
    if (deleteModalId != null) {
      handleDeleteItem(deleteModalId);
    }
    cancelDeleteHandler();
    console.log('DELETE...');
  };

  return (
    <React.Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      ></Modal>
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
        {data && data.length !== 0 ? (
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
                      names.includes(key) ? (
                        <td key={key}>{item[key]}</td>
                      ) : null
                    )}
                    <td>{moment(item.createdAt).format('YYYY/MM/DD')}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() =>
                            history.push(`/${url}/edit/${item._id}`)
                          }
                        >
                          <i className="fa fa-pencil-square-o" />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => showDeleteWarningHandler(item._id)}
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
    </React.Fragment>
  );
};

export default withRouter(Table);
