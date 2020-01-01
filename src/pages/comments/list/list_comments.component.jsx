import React from 'react';
import Table from '../../../components/table/table.component';

import useFetch from '../../../effects/use-fetch.effect';

const CommentsPage = () => {
  const comments = useFetch('ins_comments');

  return (
    <div>
      <Table {...comments} names={['name']} url="comments" title="Comments" />
    </div>
  );
};

export default CommentsPage;
