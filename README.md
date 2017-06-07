# ygq-rc-listView
[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: http://img.shields.io/npm/v/rc-listView.svg?style=flat-square
[npm-url]: http://npmjs.org/package/rc-listView
[download-image]: https://img.shields.io/npm/dm/ygq-rc-listView.svg?style=flat-square
[download-url]: https://npmjs.org/package/ygq-rc-listView
...

## Demo

https://fdt-component.github.io/rc-listView/docs/index.html

## install

[![fdt-calendar](https://nodei.co/npm/fdt-calendar.png)](https://npmjs.org/package/fdt-calendar)

## Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ListView from 'ygq-rc-listview';

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

```

## Props

| Properties | Descrition | Type | isRequired | Default |
| --- | --- | --- | --- | --- |
| contentClassname | 列表的父级类名 | string | no | 0 |
| diff | 预加载距离 | number | no | 150(px) |
| minDelay | 最小节流 | number | no | 20(ms) |
| moreEle | 加载中节点 | node | no | '加载中' |
| doneEle | 加载完成节点 | node | no | '已经到底啦' |
| noneEle| 无数据节点 | node | no | '暂无数据' |
| scrollEvent| 滚动触发函数 | func | no | · |
| status| 当前列表状态 | oneOf(['more', 'done', 'none']) | no | · |

## License

The MIT License (MIT)

Copyright (c) 2015 guoquan.yang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
