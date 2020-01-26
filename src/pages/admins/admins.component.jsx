import React from 'react';

import Table from '../../components/table/table.component';

import useFetch from '../../effects/use-fetch.effect';
import Card from '../../shared/components/UIElements/Card';

const AdminsPage = () => {
  const users = useFetch('users');

  return (
    <div className="my-container">
      <Card>
        <Table
          {...users}
          names={['name', 'email']}
          url="admins"
          title="Admins"
        />
      </Card>
    </div>
  );
};

export default AdminsPage;
