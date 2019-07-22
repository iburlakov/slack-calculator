require('../../common');

class UserRepository {
    constructor(db) {
        this.db = db;
    }

    all() {
        return this.db.any('select * from users;');
    }

    one(userId) {
        return this.db.oneOrNone('select * from users where "user_id" = $1', userId);
    }

    byEmail(email) {
        return this.db.oneOrNone('select * from users where "email" = $1', email);
    }

    delete(userId) {
        throw new NotImplementedError('delete method is not implemented');
    }

    add(email, token, name, slackId) {
        return this.db.one("insert into users(email, slack_token, slack_id, slack_name) values($1, $2, $3, $4) RETURNING email", [email, token, name, slackId]);
    }
    update(email, token, name, slackId) {
        return this.db.one("update users set slack_token=$1, slack_id=$2 where email=$3 RETURNING email", [ token, slackId, email]);
    }
}

module.exports = db => new UserRepository(db);