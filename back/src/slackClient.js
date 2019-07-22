const fetch =   require('node-fetch');



class slackClient {

    oauth(code, client_id, client_secret, redirect_uri) {
        
        console.log(redirect_uri);

        return fetch(`https://slack.com/api/oauth.access?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`, {method: 'POST'})
            .then(res =>  res.json())
            .then(json => {
                
                console.log(`OAUTH REQUEST: ${JSON.stringify(json)}`)
                
                if (!json.ok) {
                    throw new Error(json.error);
                }
                return json;
            });
    }


    // todo: refactor to have a param to identify is the message is posted as from bot or from app
    postMessage ( text, channel, token) {
        fetch('https://slack.com/api/chat.postMessage',
        {
            method: "POST",
            body: JSON.stringify({ text: text, channel: channel, as_user: "true"}),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })
        .then(resp => {
            // console.log(resp.status);
            //console.log(resp.statusText);
            console.log(`Posted message to channel ${channel}: ${resp.status}`);
            return resp.json();
        })
        .then(body => {
            //console.log(`ERROR Posted message to channel ${JSON.stringify(body)}`);
            
            if (!body.ok) {
                throw new Error(body.error);
            }
        })
        .catch(err => console.log(`Failed to post a message ${err.message}`));
    }

    verify(payload) {
        return {challenge: payload.challenge};
    }

    getConversations(token, userId) {
        return fetch (`https://slack.com/api/users.conversations?token=${token}&limit=100&user${userId}&types=public_channel,private_channel`,
            {method: "GET"})
            .then(res => res.json())
            .then(conversations =>
                {
                    return conversations.channels.map(c => {return {id:c.id, name:c.name}});
                });
    }

}

module.exports = new slackClient();