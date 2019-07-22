class AuthRepository {
    constructor(db) {
        this.db = db;
    }

    add(teamId, teamName, appToken, botToken) {
        //console.log(`adding token  ${teamId}: ${oAuthToken}`);
        return this.db.none("insert into app_tokens(team_id, team_name, app_token, bot_token) values($1, $2, $3, $4) \
        ON CONFLICT (team_id) \
        DO \
        UPDATE SET app_token = $3, bot_token=$4", [teamId, teamName, appToken, botToken]);
    }

    get(teamId) {
        //console.log(`GET: ${teamId}`);
        return this.db.oneOrNone("select * from app_tokens where team_id=$1", teamId);
    }
}

module.exports = db => new AuthRepository(db);