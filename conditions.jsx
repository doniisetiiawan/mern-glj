import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Toggle = ({ condition, children }) => (condition ? children[0] : children[1]);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'blue',
    };
  }

  onClick = () => {
    this.setState(({ color }) => ({
      color: color === 'blue' ? 'lime' : 'blue',
    }));
  };

  render() {
    const { color } = this.state;
    return (
      <>
        <Toggle condition={color === 'blue'}>
          <p style={{ color }}>Blue!</p>
          <p style={{ color }}>Lime!</p>
        </Toggle>
        <button type="button" onClick={this.onClick}>
          Toggle Colors
        </button>
      </>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('[role="main"]'),
);
