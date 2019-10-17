/* eslint-disable max-classes-per-file */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

class LifeCycleTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toTimeString(),
      color: null,
      dontUpdate: false,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return nextProps;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        time: new Date().toTimeString(),
      });
    }, 100);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !nextState.dontUpdate;
  }

  getSnapshotBeforeUpdate() {
    return 'snapshot before update';
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(
      'Component did update and received snapshot:',
      snapshot,
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <span style={{ color: this.state.color }}>
        {this.state.time}
      </span>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      dontUpdate: false,
      unmount: false,
    };
  }

  toggleColor = () => {
    this.setState((prevState) => ({
      color: prevState.color === 'red' ? 'blue' : 'red',
    }));
  };

  toggleUpdate = () => {
    this.setState((prevState) => ({
      dontUpdate: !prevState.dontUpdate,
    }));
  };

  toggleUnmount = () => {
    this.setState((prevState) => ({
      unmount: !prevState.unmount,
    }));
  };

  render() {
    const { color, dontUpdate, unmount } = this.state;
    return (
      <>
        {unmount === false && (
          <LifeCycleTime
            color={color}
            dontUpdate={dontUpdate}
          />
        )}
        <button type="button" onClick={this.toggleColor}>
          Toggle color
          {JSON.stringify({ color })}
        </button>
        <button type="button" onClick={this.toggleUpdate}>
          Should update?
          {JSON.stringify({ dontUpdate })}
        </button>
        <button type="button" onClick={this.toggleUnmount}>
          Should unmount?
          {JSON.stringify({ unmount })}
        </button>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('[role="main"]'),
);
