import React from 'react';
import ReactDOM from 'react-dom';
import ListView from '../src/index.js';

const rootEl = document.createElement('div');
document.body.appendChild(rootEl);


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
    const newData = [{},{},{},{},{},{}];
    const {data} = this.state;
    if(data.length > 100) {
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
        contentClassname="content"
        scrollEvent={this.scrollEvent}
        status={this.state.status}
      >
        <div>{this.renderItem()}</div>
      </ListView>
    );
  }
}


if (module.hot) {
  import('react-hot-loader').then(({AppContainer}) => {
    const render = () => ReactDOM.render(<AppContainer><App /></AppContainer>, rootEl);
    render();
    module.hot.accept('../src/index.js', render);
  });
}
