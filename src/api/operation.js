const {GET, POST} = require('../common/handlers');



class OperationController {
    constructor (app, route) {
        app.post(route + '/sum', this.sum);
        
    }
    
    sum(req, res) {
        POST(req, res, () => Promise.resolve().then(() => 42));
    }
}


module.exports = (app, route) => new OperationController(app, route);
