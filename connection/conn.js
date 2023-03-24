const mongoose = require('mongoose');
async function getConnection() {
    await mongoose.connect("mongodb+srv://pawarakanksha942:event@cluster0.upa73lr.mongodb.net/event?retryWrites=true&w=majority");
}
module.exports = getConnection;