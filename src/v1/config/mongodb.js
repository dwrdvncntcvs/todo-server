const { connect, disconnect } = require("mongoose");

const mongoConnect = async (databaseName) => {
  try {
    await connect(`mongodb://localhost/${databaseName}`);

    console.log(`Connected to "${databaseName.toUpperCase()}" DATABASE`);
  } catch (e) {
    console.log(e);
    disconnect();
  }
};

module.exports = { dbConnect: mongoConnect };
