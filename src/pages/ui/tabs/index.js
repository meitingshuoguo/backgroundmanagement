import React, { Component } from "react";
import { Card, Tabs, message, Icon } from "antd";
const TabPane = Tabs.TabPane;
export default class index extends Component {
  nextIndex = 0;
  handleCallback = key => {
    message.info("选择了" + key);
  };

  componentWillMount() {
    const panes = [
      {
        title: "t1",
        content: "c1",
        key: "1"
      },
      {
        title: "t2",
        content: "c2",
        key: "2"
      },
      {
        title: "t3",
        content: "c3",
        key: "3"
      }
    ];

    this.setState({
      panes,
      activeKey: panes[0].key
    });
  }
  handleEdit = (targetKey, action) => {
    this[action](targetKey);
  };
  add = () => {
    const panes = this.state.panes;
    const activeKey = `n` + this.nextIndex++;
    const pane = {
      title: "n" + this.nextIndex,
      content: "n" + this.nextIndex,
      key: activeKey
    };
    panes.push(pane);
    this.setState({
      panes,
      activeKey: activeKey
    });
  };

  remove = key => {
    let lastIndex = 0;
    let activeKey = this.state.activeKey;
    const panes = this.state.panes.filter((pane, i) => {
      if (pane.key === key) {
        lastIndex = i - 1;
        return false;
      } else {
        return true;
      }
    });

    if (panes.length && key === activeKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({
      panes,
      activeKey: activeKey
    });
  };
  render() {
    return (
      <div>
        <Card className="Tab页签">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane
              tab={
                <span>
                  <Icon type="plus" />
                  tab 1
                </span>
              }
              key="1"
            >
              cotent1
            </TabPane>
            <TabPane tab="tab 2" key="2">
              cotent2
            </TabPane>
            <TabPane tab="tab 3" key="3" disabled>
              cotent3
            </TabPane>
          </Tabs>
        </Card>
        <Card title="可编辑的">
          <Tabs
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.handleEdit}
          >
            {this.state.panes.map(pane => {
              return (
                <TabPane tab={pane.title} key={pane.key}>
                  {pane.content}
                </TabPane>
              );
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
}
