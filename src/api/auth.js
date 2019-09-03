'use strict'

const client = require('../slackClient');
const db = require('../data');

// TODO: move to env vars
const client_id = process.env.SLACK_CLIENT_ID;
const client_secret = process.env.SLACK_CLIENT_SECRET;

// set up routes
module.exports = (app, route) => {
    app.get(route + '/user', authUser);
    app.get(route + '/', install);
}

function authUser(req, res) {
    const redirect_uri = '';

    Promise.resolve(req)
        .then(validate)
        .then(code => client.oauth(code, client_id, client_secret, `https://${req.headers.host}/api/auth/user`))
        .then(json => {
            if (!json.ok) {
                throw new Error(json.error);
            }

            if (json.user) {
                return db.Users.byEmail(json.user.email)
                    .then(user => {
                        if (user) {
                            return db.Users.update(json.user.email, json.access_token, json.user.name, json.user.id);
                        }
                        else {
                            return db.Users.add(json.user.email, json.access_token, json.user.name, json.user.id);
                        }
                    });
            } else {
                // this should not happen
                throw new Error('AUTH ERROR');
            }
        })
        .then (email => {
            req.login({id: email, username: email}, err => {
                return res.redirect(`/?me=${email}`);
            });
        })
        .catch(err => {
            res.status(500).send(err.message).end();
        });
}

function install(req, res) {
    Promise.resolve(req)
        .then(validate)
        .then(code => client.oauth(code, client_id, client_secret, ''))
        .then(json => {
            if (!json.ok) {
                throw new Error(json.error);
            }

            return db.Auth.add(json.team_id, json.team_name, json.access_token, json.bot.bot_access_token);
        })
        .then (_ => {
            res.status(200).send("App was authorized.");
        })
        .catch(err => {
            res.status(500).send(err.message).end();
        });
}

function validate(req) {
    if (req.query.error) {
        throw new Error(req.query.error);
    }

    return req.query.code;
}