class NumbersRepository {
    constructor(db) {
        this.db = db;
    }

    byUser(userId) {
        return this.db.any('select number, added from numbers where "user_id" = $1', userId);
    }

    byChannel(channelId) {
        return this.db.any('select number, added from numbers where "channel_id" = $1', channelId);
    }

    // TODO: add filters by date added
    
    add(teamId, channelId, number) {
        //console.log(userId + ' ' + number);
        return this.db.one('insert into numbers("team_id", "channel_id", "number") values($1, $2, $3) returning *', [teamId, channelId, number]);
    }

}

module.exports = db => new NumbersRepository(db);