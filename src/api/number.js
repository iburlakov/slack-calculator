const {GET, POST} = require('../common/handlers');

const dbClient = require('../data');

class NumberController {
    constructor (app, route) {
        app.get(route + '/:userId', this.getNumbers);
        app.post(route + '/:userId', this.add);
    }

    getNumbers(req, res) {
        GET(req, res, () => dbClient.Numbers.byUser(req.params.userId));
    }

    add(req, res) {
        POST(req, res, () => dbClient.Numbers.add(req.params.userId,  req.body.number));
    }

}

module.exports = (app, route) => new NumberController(app, route);
