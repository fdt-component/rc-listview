import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src/index.js';

class App extends React.Component {

  state = {
    data: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
    status: 'more'
  }

  styles = {
    lineHeight: '50px',
    width: '100%',
    background: '#f3f3f3',
    borderBottom: '1px solid #999',
    color: 'orange',
    textAlign: 'center'
  }

  scrollEvent = () => {
    console.log('触发滚动事件');
    const newData = [{},{},{},{},{},{}];
    const {data} = this.state;
    if(data.length > 80) {
      this.setState({
        status: 'done'
      });
    } else {
      setTimeout(() => {
        this.setState({
          data: data.concat(newData)
        });
      }, 100);
    }
  }

  renderItem() {
    return this.state.data.map((item, idx) => (
      <div key={idx} style={this.styles}>item {idx}</div>
    ));
  }

  render() {
    return (
      <ListView
        scrollEvent={this.scrollEvent}
        status={this.state.status}
      >
        <div>{this.renderItem()}</div>
      </ListView>
    );
  }
}

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);
ReactDOM.render(<App />, rootEl);
