import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Header from './component/Header';
import Footer from './component/Footer';
import Description from './component/Description';

const App = () => (
  <>
    <Header title="React App" />
    <Description />
    <Footer date={new Date().toDateString()} />
  </>
);

ReactDOM.render(
  <App />,
  document.querySelector('[role="main"]'),
);
