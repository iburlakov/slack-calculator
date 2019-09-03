const app = require('./src/app');
const fs = require('fs');

require('dotenv').config();

module.exports = app;

const port = process.env.PORT || 8081
app.listen(port, () => {
    console.log(`Started at port ${port}`);

    const sessionsFolder = './sessions';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
});