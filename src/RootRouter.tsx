import { Layout } from 'antd';
import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Articles from './containers/Articles';
import './RootRouter.scss';

const {Content} = Layout;

class RootRouter extends React.Component {


  public render() {
    return (
      <Layout id="main" style={{backgroundColor:'#fff'}}>
        <Content>
          <Switch>
            <Route exact={true} path="/" render={this.redirectToArticles}/>
            <Route path="/articles" component={Articles}/>
          </Switch>
        </Content>
      </Layout>
    );
  }

  private redirectToArticles() {
    return <Redirect to="/articles"/>;
  }
}

export default RootRouter;
