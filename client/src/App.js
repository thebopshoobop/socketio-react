import React, { Component } from "react";
import {
  Button,
  Grid,
  Header,
  Message,
  Segment,
  Container
} from "semantic-ui-react";
import io from "socket.io-client";

import Login from "./Login";

const socket = io.connect("http://localhost:3001");

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      message: ""
    };
    socket.on("poked", () => this.setState({ message: "poked" }));
    socket.on("tickled", () => this.setState({ message: "tickled" }));
  }

  onLogIn = () => {
    socket.emit("authentication", this.state);
  };

  onSignUp = () => {
    socket.emit("authentication", { ...this.state, register: true });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSocket = event => () => {
    socket.emit(event);
  };

  actions = {
    onLogIn: this.onLogIn,
    onSignUp: this.onSignUp,
    onChange: this.onChange
  };

  render() {
    return (
      <Container>
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column width={6}>
            <Login actions={this.actions} values={this.state} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Segment>
              <Header>Send an Event:</Header>
              <Button
                onClick={this.onSocket("poke")}
                color="green"
                size="large"
              >
                Poke
              </Button>
              <Button
                onClick={this.onSocket("tickle")}
                color="red"
                size="large"
              >
                Tickle
              </Button>
              <Message>
                <Message.Header>Event Response</Message.Header>
                <Message.Content>{this.state.message}</Message.Content>
              </Message>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default App;
