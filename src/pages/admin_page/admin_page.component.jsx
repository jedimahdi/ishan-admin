import React from 'react';
import { Route } from 'react-router-dom';

import DashboardPage from '../dashboard/dashboard.component';
import SettingsPage from '../settings/settings.component';

import ArticlesPage from '../articles/list/list_articles.component';
import CreateArticlePage from '../articles/create/create_article.component';
import EditArticlePage from '../articles/edit/edit_article.component';

import CommentsPage from '../comments/list/list_comments.component';
import CreateCommentPage from '../comments/create/create_comment.component';
import EditCommentPage from '../comments/edit/edit_comment.component';

import AdminsPage from '../../pages/admins/admins.component';

import Header from '../../components/header/header.component';
import Sidebar from '../../components/sidebar/sidebar.component';

const AdminPage = () => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
            <Route exact path="/" component={DashboardPage} />

            <Route exact path="/articles" component={ArticlesPage} />
            <Route path="/articles/create" component={CreateArticlePage} />
            <Route
              path="/articles/edit/:articleId"
              component={EditArticlePage}
            />

            <Route exact path="/comments" component={CommentsPage} />
            <Route path="/comments/create" component={CreateCommentPage} />
            <Route
              path="/comments/edit/:commentId"
              component={EditCommentPage}
            />

            <Route exact path="/admins" component={AdminsPage} />

            <Route path="/settings" component={SettingsPage} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
