const { GET, POST } = require('../common/handlers');
const db = require('../data');
const client = require('../slackClient');

class BotController {
    constructor(app, route) {
        app.post(route, this.process);

    }

    process(req, res) {
        const payload = req.body;

        if (payload.type == 'url_verification') {
            res.status(200).json(client.verify(payload)).end();
            return;
        } else {

            res.status(200).end();
        }

        console.log(`Got event of ${payload.event.type}`);

        if (payload.event.type == 'app_mention') {
            db.Auth.get(payload.team_id)
                .then(token =>  {
                    client.postMessage(`Hello <@${payload.event.user}>!`, payload.event.channel, token.bot_token);
               });
        }
        else if (payload.event.type === "message") {
            const text = payload.event.text

            if (text.includes("sum")) {
                db.Auth.get(payload.team_id)
                    .then(token => {
                        db.Numbers.byChannel(payload.event.channel)
                            .then(data => {
                                let sum = 0;
                                for (const d of data) {
                                    const val = parseInt(d.number)
                                    if (val) sum +=val;
                                }
                                client.postMessage(`SUM of previouse messages is ${sum}`, payload.event.channel, token.bot_token);
                            });
                    });
            }
            else if (text.includes('clear')) {
                db.Numbers.delete(payload.event.channel)
                    .then(deleted => {
                        client.postMessage(`${deleted} nums deleted`, payload.event.channel, token.bot_token);
                    })
                    .catch(err => {
                        console.log(`Error deleting messages for channle ${payload.event.channel}: ${err.message}`);
                    })
            }
            else {
               if (payload.event.user != "BL3FFUTDJ") {
                    let matches = text.match(/(\d+)/gi);
                    if (matches) { 
                        for(const match of matches) {
                            db.Numbers.add(payload.team_id, payload.event.channel, match);
                            console.log(`ADDED: ${match}`);
                        }
                    }
                }   
            }
        }
    }
}

module.exports = (app, route) => new BotController(app, route);