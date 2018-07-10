import { Col, Divider, Row } from 'antd';
import Icon from 'antd/lib/icon';
import { autobind } from 'core-decorators';
import moment from 'moment';
import Quill from 'quill';
import * as React from 'react';

interface IArticleAttributes {
  content: string;
  createdAt: string;
  id: number;
  readNum: number;
  title: string;
  updatedAt: string;
}

export default class Content extends React.Component<IArticleAttributes> {

  private quill: Quill;
  private quillContainer: any;

  constructor(props) {
    super(props);
    this.state = {data: undefined};
  }

  public componentDidMount() {
    this.initQuill();
  }

  public componentWillUnmount() {
    this.quill.disable();
  }

  public render() {
    return (
      <React.Fragment>
        <Row>
          <Col span={24}>
            {this.props.title}
          </Col>
        </Row>
        <Row>
          <Col>
            <Icon type="clock-circle-o"/>
            <span>&nbsp;创建时间：{moment(this.props.createdAt).format('YYYY/MM/DD')}&nbsp;</span>
            <Icon type="clock-circle-o"/>
            <span>&nbsp;修改时间：{moment(this.props.updatedAt).format('YYYY/MM/DD')}&nbsp;</span>
            <Icon type="eye-o"/>
            <span>&nbsp;阅读数：{this.props.readNum}&nbsp;</span>
          </Col>
        </Row>
        <Divider/>
        <Row>
          <Col span={24}>
            <div ref={this.getQuillContainer}/>
          </Col>
        </Row>
      </React.Fragment>
    );
  }


  @autobind
  private getQuillContainer(quillContainer) {
    this.quillContainer = quillContainer;
  }

  private initQuill() {
    this.quill = new Quill(this.quillContainer, {
      modules : {
        'syntax' : true,
        'toolbar': false,
      },
      readOnly: true,
      theme   : 'snow',
    });
    this.quill.setContents(JSON.parse(this.props.content));
  }
}