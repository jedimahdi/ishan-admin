import React from 'react';

import Table from '../../../components/table/table.component';
import useFetch from '../../../effects/use-fetch.effect';
import Card from '../../../shared/components/UIElements/Card';

const CommentsPage = () => {
  const comments = useFetch('ins_comments');

  return (
    <div className="my-container">
      <Card>
        <Table {...comments} names={['name']} url="comments" title="Comments" />
      </Card>
    </div>
  );
};

export default CommentsPage;
