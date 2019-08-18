const {GET} = require('../common/handlers');

const dbClient = require('../data');

class UserController {
    constructor (app, route) {
        app.get(route, this.allUsers);
        app.get(route + '/:id', this.byId);
        app.delete(route + '/:id', this.delete);
    }

    allUsers(req, res) {
        GET(req, res, () => dbClient.Users.all());
    }

    byId(req, res) {
        GET(req, res, () => dbClient.Users.one(req.params.id));
    }

    delete(res, req) {
        GET(req, res, () =>dbClient.Users.delete(req.params.id));
    }
}

module.exports = (app, route) => new UserController(app, route);
