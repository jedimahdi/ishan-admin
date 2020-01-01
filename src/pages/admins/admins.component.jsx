import React from 'react';

import Table from '../../components/table/table.component';

import useFetch from '../../effects/use-fetch.effect';

const AdminsPage = () => {
  const users = useFetch('users');

  return (
    <div>
      <Table {...users} names={['name', 'email']} url="admins" title="Admins" />
    </div>
  );
};

export default AdminsPage;
