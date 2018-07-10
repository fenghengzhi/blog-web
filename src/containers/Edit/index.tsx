import { Button, Col, Input, message, Row } from 'antd';
import Axios from 'axios';
import { autobind } from 'core-decorators';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Quill from 'quill';
// interface Props {
//   data:any[]
// }
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

((window as any).hljs as typeof hljs).configure({   // optionally configure hljs
  languages: ['typescript'],
});
// (window as any).hljs = hljs;
const fonts = ['sofia', 'slabo', 'roboto', 'inconsolata', 'ubuntu'];
// tslint:disable-next-line
// console.log(require('quill/formats/font'));
// const Font = Quill.import(require('quill/formats/font'));
const Font = Quill.import('formats/font');
Font.whitelist = fonts;
Quill.register(Font, true);

export default class Edit extends React.Component<RouteComponentProps<{id:string}>, { title: string; token: string }> {
  private quill: Quill;
  private quillContainer: any;

  constructor(props) {
    super(props);
    this.state = {token: '', title: ''};

  }

  public componentDidMount() {
    this.initQuill();
    this.getToken();
    this.getArticle();
  }

  public componentWillUnmount() {
    this.quill.disable();
  }

  public render() {
    return (
      <div>
        <Row>
          <Col span={24} style={{marginBottom: 16}}>
            <Input placeholder="标题" value={this.state.title} onChange={this.titleChangeHandler}/>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div ref={this.getQuillContainer}/>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col style={{marginTop: 16}} span={24}>
            <Row type={'flex'} gutter={16}>
              <div style={{flexGrow: 1, flexShrink: 1}}>
                <Input placeholder="token" value={this.state.token} onChange={this.tokenChangeHandler}/>
              </div>
              <div style={{flexGrow: 0, flexShrink: 0}}>
                <Button onClick={this.submit} type="primary">提交</Button>
              </div>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }

  private async getArticle() {
    const id: string = this.props.match.params.id;
    if (id) {
      const data = await Axios.get(`/api/articles/${id}`);
      this.quill.setContents(JSON.parse(data.data.content));
      this.setState({title: data.data.title});
    }
  }

  @autobind
  private getQuillContainer(quillContainer) {
    this.quillContainer = quillContainer;
  }

  private getToken() {
    const token = localStorage.token;
    if (token) {
      this.setState({token});
    }
  }

  private initQuill() {
    this.quill = new Quill(this.quillContainer, {
      modules: {
        'syntax' : true,
        'toolbar': [
          [{'font': []}, {'size': []}],
          ['bold', 'italic', 'underline', 'strike'],
          [{'color': []}, {'background': []}],
          [{'script': 'super'}, {'script': 'sub'}],
          [{'header': '1'}, {'header': '2'}, 'blockquote', 'code-block'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['direction', {'align': []}],
          ['link', 'image', 'video', 'formula'],
          ['clean'],
        ],
      },
      theme  : 'snow',
    });
  }

  private saveToken() {
    localStorage.token = this.state.token;
  }

  @autobind
  private async submit() {

    const id: string = this.props.match.params.id;
    if (id) {
      try {
        await Axios.put(`/api/articles/${id}`, {
          content: JSON.stringify(this.quill.getContents()),
          title  : this.state.title,
        }, {headers: {token: this.state.token}});
        message.success('修改成功');
        this.saveToken();
      } catch {
        message.error('修改失败');
      }
    } else {
      try {
        await Axios.post('/api/articles', {
          // content: JSON.stringify(this.quill.getContents()),
          content: JSON.stringify(this.quill.getContents()),
          title  : this.state.title,
        }, {headers: {token: this.state.token}});
        // tslint:disable-next-line
        // console.log(this.quill.getContents(), this);
        message.success('新建成功');
        this.saveToken();
      } catch {
        message.error('新建失败');
      }
    }
  }

  @autobind
  private titleChangeHandler(event) {
    this.setState({title: event.target.value});
  }

  @autobind
  private tokenChangeHandler(event) {
    this.setState({token: event.target.value});
  }
}
