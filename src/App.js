import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import LoginPage from './pages/login/login.component';
import DashboardPage from './pages/dashboard/dashboard.component';
import SettingsPage from './pages/settings/settings.component';
import ArticlesPage from './pages/articles/list/list_articles.component';
import CreateArticlePage from './pages/articles/create/create_article.component';
import EditArticlePage from './pages/articles/edit/edit_article.component';
import CommentsPage from './pages/comments/list/list_comments.component';
import CreateCommentPage from './pages/comments/create/create_comment.component';
import EditCommentPage from './pages/comments/edit/edit_comment.component';
import AdminsPage from './pages/admins/admins.component';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import { AuthContext } from './shared/contexts/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={DashboardPage} />
        <Route exact path="/articles" component={ArticlesPage} />
        <Route path="/articles/create" component={CreateArticlePage} />
        <Route path="/articles/edit/:articleId" component={EditArticlePage} />
        <Route exact path="/comments" component={CommentsPage} />
        <Route path="/comments/create" component={CreateCommentPage} />
        <Route path="/comments/edit/:commentId" component={EditCommentPage} />
        <Route exact path="/admins" component={AdminsPage} />
        <Route path="/settings" component={SettingsPage} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <Router basename={process.env.PUBLIC_URL}>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
