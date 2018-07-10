import { Layout } from 'antd';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Article from './containers/Article';
import Articles from './containers/Articles';
import Edit from './containers/Edit';
import './RootRouter.scss';

const {Content} = Layout;

class RootRouter extends React.Component {


  private static renderRedirectToArticles() {
    return <Redirect to="/articles"/>;
  }

  public render() {
    return (
      <Layout id="main" style={{backgroundColor: '#fff'}}>
        <Content style={{padding: '0 50px', marginTop: 64}}>
          <div style={{background: '#fff', padding: 24, minHeight: 380}}>
            <Switch>
              <Route exact={true} path="/" render={RootRouter.renderRedirectToArticles}/>
              <Route exact={true} path="/articles" component={Articles}/>
              <Route path="/articles/:id" component={Article}/>
              <Route exact={true} path="/edit" component={Edit}/>
              <Route path="/edit/:id" component={Edit}/>
            </Switch>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default RootRouter;
