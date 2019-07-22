import React from 'react'

export default class SignIn extends React.Component {
    constructor(props) {
        super(props);

        // init state
    }

    render() {
        return (
            <div>
                <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email&client_id=618140428834.679173140372&redirect_uri=https%3A%2F%2F5b4c24df.ngrok.io%2Fapi%2Fauth%2Fuser">
                    <img src="https://api.slack.com/img/sign_in_with_slack.png" />
                </a>
            </div>
        );
    }
}