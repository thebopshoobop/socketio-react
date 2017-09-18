import React from "react";
import { Button, Form, Header, Segment } from "semantic-ui-react";

const Login = ({ values, actions }) => (
  <Form size="large">
    <Header>Please Log In</Header>
    <Segment>
      <Form.Input
        name="username"
        fluid
        placeholder="Username"
        value={values.username}
        onChange={actions.onChange}
      />
      <Form.Input
        name="password"
        fluid
        placeholder="Password"
        type="password"
        value={values.password}
        onChange={actions.onChange}
      />
      <Button onClick={actions.onLogIn} color="blue" size="large">
        Log In
      </Button>
      <Button onClick={actions.onSignUp} color="violet" size="large">
        Sign Up
      </Button>
    </Segment>
  </Form>
);

export default Login;
