import { Col, Row } from 'antd';
import * as React from 'react';
import { Link } from 'react-router-dom';

class Item extends React.Component {
  public render() {
    return (
      <Row>
        <Col span={4}/>
        <Col span={16}>
          <Link to={}/>
        </Col>
        <Col span={4}/>
      </Row>
    );
  }
}

export default Item;