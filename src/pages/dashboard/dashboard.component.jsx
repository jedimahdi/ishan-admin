import React from 'react';

import './dashboard.styles.scss';
import Card from '../../shared/components/UIElements/Card';

const DashboardPage = () => (
  <div className="my-container">
    <Card>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group mr-2">
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Share
            </button>
            <button type="button" className="btn btn-sm btn-outline-secondary">
              Export
            </button>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary dropdown-toggle"
          >
            <span data-feather="calendar" />
            This week
          </button>
        </div>
      </div>
    </Card>
  </div>
);

export default DashboardPage;
