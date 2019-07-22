const { GET, POST } = require('../common/handlers');

const fetch = require('node-fetch');

const db = require('../data');

const client = require('../slackClient');

class BotController {
    constructor(app, route) {
        app.post(route, this.process);

    }


    process(req, res) {
        const payload = req.body;

        console.log(payload);

        if (payload.type == 'url_verification') {
            res.status(200).json(this.verify(payload)).end();
            return;
        } else {

            res.status(200).end();
        }

        console.log(`Got event of ${payload.event.type}`);

        if (payload.event.type == 'app_mention') {

           // console.log(`Got event of ${payload.event.type}`);

            //console.debug(payload);
           // const that = this;
            db.Auth.get(payload.team_id)
                .then(token =>  {
                     //console.log("TOKEN: " + token.app_oken);

                    //if (payload.event.type == 'app_mention') {

                    //  console.log(JSON.stringify({text: `Hello ${payload.event.user}!`, channel: payload.event.channel}));

                    client.postMessage(`Hello <${payload.event.user}>!`, payload.event.channel, token.bot_token);

                    // fetch('https://slack.com/api/chat.postMessage',
                    //     {
                    //         method: "POST",
                    //         body: JSON.stringify({ text: `Hello <${payload.event.user}>!`, channel: payload.event.channel }),
                    //         headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token.authToken}` }
                    //     })
                    //     .then(resp => {
                    //         // console.log(resp.status);
                    //         //console.log(resp.statusText);
                    //         console.log(`Posted message to channel ${payload.event.channel}: ${resp.status}`);
                    //         return resp.json();
                    //     })
                    //     .then(body => {
                    //         if (!body.ok) {
                    //             throw new Error(body.error);
                    //         }
                    //     })
                    //     .catch(err => console.log(`Failed to post a message ${err.message}`));


               });
        }
        if (payload.event.type === "message") {
            const text = payload.event.text

            if (text.includes("sum")) {

//let sumOUT = 0;
//let tokenOUT;
//let that = this;
//ar fP = this.postMessage;
                db.Auth.get(payload.team_id)
                    .then(token => {
                   //     tokenOUT = token;
                    db.Numbers.byChannel(payload.event.channel)
                        .then(data => {
                            let sum = 0;
                            for (const d of data) {
                                const val = parseInt(d.number)

                                if (val) sum +=val;
                            }
                            //sumOUT= sum

                            client.postMessage(`SUM: ${sum}`, payload.event.channel, token.bot_token);

                            });
                        
                    });
                   // .then(sum => fP(`SUM: ${sumOUT}`, payload.event.channel, tokenOUT.authToken));


            }
            else {

               if (payload.event.bot_id != "BL3FFUTDJ")
               {


                    let matches = text.match(/(\d+)/gi);
                    if (matches) { 
                    //console.log(matches);
                        for(const match of matches) {
                            
                            db.Numbers.add(payload.team_id, payload.event.channel, match);
                            console.log(`ADDED: ${match}`);
                        }
                    }
                }   
            }
        }

    }

    summ(token) {
        db.Numbers.byChannel(payload.event.channel)
            .then(data => {
                let sum = 0;
                for (const d of data) {
                    sum +=d.number;
                }
                return {token, sum};
            })
    }

    postMessage ( text, channel, token) {
        fetch('https://slack.com/api/chat.postMessage',
        {
            method: "POST",
            body: JSON.stringify({ text: text, channel: channel }),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            // console.log(resp.status);
            //console.log(resp.statusText);
            console.log(`Posted message to channel ${channel}: ${resp.status}`);
            return resp.json();
        })
        .then(body => {
            if (!body.ok) {
                throw new Error(body.error);
            }
        })
        .catch(err => console.log(`Failed to post a message ${err.message}`));
    }

    verify(payload) {
        //console.log("verify is called")
        //return Promise.resolve({ challenge: payload.challenge });
        return {challenge: payload.challenge};
    }
}


module.exports = (app, route) => new BotController(app, route);


/* commnad post args
token=gIkuvaNzQIHg97ATvDxqgjtO
&team_id=T0001
&team_domain=example
&enterprise_id=E0001
&enterprise_name=Globular%20Construct%20Inc
&channel_id=C2147483705
&channel_name=test
&user_id=U2147483697
&user_name=Steve
&command=/weather
&text=94070
&response_url=https://hooks.slack.com/commands/1234/5678
&trigger_id=13345224609.738474920.8088930838d88f008e0 */



/*
message.channels event
{
    "token": "one-long-verification-token",
    "team_id": "T061EG9R6",
    "api_app_id": "A0PNCHHK2",
    "event": {
        "type": "message",
        "channel": "C024BE91L",
        "user": "U2147483697",
        "text": "Live long and prospect.",
        "ts": "1355517523.000005",
        "event_ts": "1355517523.000005",
        "channel_type": "channel"
    },
    "type": "event_callback",
    "authed_teams": [
        "T061EG9R6"
    ],
    "event_id": "Ev0PV52K21",
    "event_time": 1355517523
}


app_mention event

{
    "type": "app_mention",
    "user": "U061F7AUR",
    "text": "<@U0LAN0Z89> is it everything a river should be?",
    "ts": "1515449522.000016",
    "channel": "C0LAN2Q65",
    "event_ts": "1515449522000016"
}

url_verification event

{
    "token": "Jhj5dZrVaK7ZwHHjRyZWjbDl",
    "challenge": "3eZbrw1aBm2rZgRNFdxV2595E9CY3gmdALWMmHkvFXO7tYXAYM8P",
    "type": "url_verification"
}
*/