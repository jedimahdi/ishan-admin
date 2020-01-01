import React from 'react';

import Table from '../../../components/table/table.component';

import useFetch from '../../../effects/use-fetch.effect';

const ArticlesPage = () => {
  const articles = useFetch('articles');

  return (
    <div>
      <Table
        {...articles}
        names={['title', 'author']}
        url="articles"
        title="Articles"
      />
    </div>
  );
};

export default ArticlesPage;
