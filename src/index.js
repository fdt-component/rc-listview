import 'index.less';
import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';

class ListView extends React.PureComponent {
  constructor(props) {
    super(props);
    const {minDelay, moreEle, doneEle, noneEle} = this.props;
    this.handleScroll = throttle(this.scrollEvent, minDelay);
    this.moreEle = moreEle ? moreEle : <div className="fdt-list-more" />;
    this.doneEle = doneEle ? doneEle : <div className="fdt-list-done" />;
    this.noneEle = noneEle ? noneEle : <div className="fdt-list-none" />;
  }

  scrollEvent = () => {
    const {diff, status} = this.props;
    const target = this.wrapEl;
    const wrapHeight = target.clientHeight;
    const contentHeight = this.content.clientHeight;
    const scrollTop = target.scrollTop;
    if(wrapHeight + scrollTop > contentHeight - diff && status === 'more') {
      this.props.scrollEvent && this.props.scrollEvent();
    }
  }

  isScroll = () => (this.wrapEl.clientHeight < this.content.clientHeight)

  scrollTop = () => (this.wrapEl.scrollTop = 0)

  renderStatus = () => {
    const {status} = this.props;
    switch (status) {
      case 'more':
        return this.moreEle;
        break;
      case 'done':
        return this.doneEle;
        break;
      case 'none':
        return this.noneEle;
        break;
      default :
        return <div />;
        break;
    }
  }

  render() {
    const {children, contentClassname} = this.props;
    return (
      <div
        className="fdt-list-wrap"
        onScroll={this.handleScroll}
        ref={ref => (this.wrapEl = ref)}
      >
        <div
          className={contentClassname}
          ref={ref => this.content = ref}
        >{children}</div>
        {this.renderStatus()}
      </div>
    );
  }
}

ListView.defaultProps = {
  diff: 150,
  minDelay: 20,
  status: 'more'
};
// contentClassname: 列表样式
// diff: 预加载距离
// minDelay: 节流事件
// moreEle: 加载更多节点
// doneEle: 加载完成节点
// noneEle: 无数据节点
// scrollEvent: 触发加载更多事件
// status ? 'more' : 'done' : 展示列表状态
ListView.propTypes = {
  children: PropTypes.node,
  contentClassname: PropTypes.string,
  diff: PropTypes.number,
  doneEle: PropTypes.node,
  minDelay: PropTypes.number,
  moreEle: PropTypes.node,
  noneEle: PropTypes.node,
  scrollEvent: PropTypes.func,
  status: PropTypes.string,
};

export default ListView;
