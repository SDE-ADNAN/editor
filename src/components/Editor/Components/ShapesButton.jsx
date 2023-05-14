import React, { Component } from 'react';
import Shapes from './Shapes';

export default class ShapesButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isHide: true,
        };
    
        this.deleteRef = React.createRef();
      }
  render() {
    return <div>
        
        <Shapes/>
    </div>;
  }
}

