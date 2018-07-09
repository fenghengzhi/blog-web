import * as React from 'react';
import Item from './Item';

class Articles extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
      </React.Fragment>
    );
  }
}

export default Articles;