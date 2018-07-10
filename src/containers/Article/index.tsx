import { Row, Spin } from 'antd';
import Axios from 'axios';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import Content from './Content';

interface IArticleAttributes {
  content: string;
  createdAt: string;
  id: number;
  readNum: number;
  title: string;
  updatedAt: string;
}

export default class Article extends React.Component<RouteComponentProps<{ id: string }, {}>, { data: IArticleAttributes | undefined }> {


  constructor(props) {
    super(props);
    this.state = {data: undefined};
  }

  public componentDidMount() {
    this.getData();
  }


  public render() {
    if (this.state.data) {
      return (
        <Content {...this.state.data}/>
      );
    } else {
      return <Row type={'flex'} justify={'center'}><Spin/></Row>;
    }
  }

  private async getData() {
    const id = this.props.match.params.id;
    const data = await Axios.get(`/api/articles/${id}`);
    this.setState({data: data.data});
  }


}