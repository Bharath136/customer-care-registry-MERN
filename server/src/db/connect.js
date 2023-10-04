const mongoose = require("mongoose");
// Middleware
const db = 'mongodb+srv://online-complaint-registration:online-complaint-registration@cluster0.9oypt8f.mongodb.net/online-complaint-registration?retryWrites=true&w=majority'
// Connect to MongoDB using the connection string
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log(`Connection successful`);
}).catch((e) => {
  console.log(`No connection: ${e}`);
});

// mongodb://localhost:27017