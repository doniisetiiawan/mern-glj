import * as React from 'react';
import * as ReactDOM from 'react-dom';

class LoginForm extends React.Component {
  refForm = React.createRef();

  constructor(props) {
    super(props);
    this.state = {};
  }

  onSubmit = (event) => {
    const form = this.refForm.current;
    const data = new FormData(form);
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      user: data.get('user'),
      // eslint-disable-next-line react/no-unused-state
      pass: data.get('pass'),
    });
    event.preventDefault();
  };

  onClick = () => {
    const form = this.refForm.current;
    form.dispatchEvent(new Event('submit'));
  };

  render() {
    const {
      onSubmit, onClick, refForm, state,
    } = this;
    return (
      <>
        <form onSubmit={onSubmit} ref={refForm}>
          <input type="text" name="user" />
          <input type="text" name="pass" />
        </form>
        <button type="button" onClick={onClick}>LogIn</button>
        <pre>{JSON.stringify(state, null, 2)}</pre>
      </>
    );
  }
}
ReactDOM.render(
  <LoginForm />,
  document.querySelector('[role="main"]'),
);
