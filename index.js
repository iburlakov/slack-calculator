const app = require('./src/app');

require('dotenv').config();

console.log(process.env.SLACK_CLIENT_ID);
console.log(process.env.DB_HOST);

module.exports = app;

const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log(`Started at port ${port}`);
});