const client = require('./client');

module.exports = {
    Users: require('./repos/users')(client),
    Numbers: require('./repos/numbers')(client),
    Auth: require('./repos/auth')(client)
};