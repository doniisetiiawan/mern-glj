import * as React from 'react';
import * as ReactDOM from 'react-dom';

const Header = () => ReactDOM.createPortal(
  <h1>React Portals</h1>,
  document.querySelector('[id="heading"]'),
);

const App = () => (
  <>
    <p>Hello World!</p>
    <Header />
  </>
);

ReactDOM.render(
  <App />,
  document.querySelector('[role="main"]'),
);
