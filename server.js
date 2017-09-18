// Prepare the Server
const server = require("http").createServer();
const io = require("socket.io")(server);
const socketioAuth = require("socketio-auth");

// Connect to the Database
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const mongoOpts = { useMongoClient: true };
const mongoUrl = "mongodb://localhost/socketio-react";
io.use((socket, next) => {
  mongoose
    .connect(mongoUrl, mongoOpts)
    .then(() => next())
    .catch(e => console.error(e.stack));
});

// Authenticate!
const User = require("./User");
const authenticate = async (client, data, callback) => {
  const { username, password, register } = data;
  try {
    if (register) {
      const user = await User.create({ username, password });
      callback(null, !!user);
    } else {
      const user = await User.findOne({ username });
      callback(null, user && user.validPassword(password));
    }
  } catch (error) {
    callback(error);
  }
};

// Register Actions
const postAuthenticate = client => {
  client.on("poke", () => client.emit("poked"));
  client.on("tickle", () => client.emit("tickled"));
};

// Configure Authentication
socketioAuth(io, { authenticate, postAuthenticate, timeout: "none" });

// Start it up!
const port = 3001;
const host = "localhost";
const logger = () => console.log(`Listening: http://${host}:${port}`);
server.listen(port, host, logger);
