import { List } from 'antd';
import Axios from 'axios';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IArticleAttributes {
  id: number;
  title: string;
}

export default class Articles extends React.Component<{}, { data: IArticleAttributes[] }> {

  private static renderItem(item: IArticleAttributes) {
    return <List.Item><Link to={`/articles/${item.id}`}>{item.title}</Link></List.Item>;
  }

  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  public componentDidMount() {
    this.getData();
  }

  public render() {
    return (
      <List bordered={true} dataSource={this.state.data} renderItem={Articles.renderItem}/>
    );
  }

  private async getData() {
    const data = await Axios.get('/api/articles');
    this.setState({data: data.data});
  }
}