const db = require('./db');
const Body = require('./Body')
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {

    constructor(id, name, lat, long, username, pwhash, google_ID, thumbnail) {
        // define properties that
        // are also the names
        // of the database columns
        this.id = id;
        this.name = name;
        this.lat = lat;
        this.long = long;
        this.username = username;
        this.pwhash = pwhash;
        this.google_ID = google_ID;
        this.thumbnail = thumbnail;
    }

    // CREATE


    static oAdd(name, lat, long, username, password, google_ID, thumbnail) {
        return db.one(`
            insert into users 
                (name, lat, long, username, pwhash, google_ID, thumbnail)
            values
                ($1, $2, $3, $4, $5, $6, $7)
            returning id    
            `, [name, lat, long, null, null, google_ID, thumbnail])
            .then(data => {
                const u = new User(data.id, name, lat, long, data.username, data.pwhash, google_ID, thumbnail);
                return u;
            });
    }

    static add(name, lat, long, username, password, google_ID, thumbnail) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return db.one(`
            insert into users 
                (name, lat, long, username, pwhash, google_ID, thumbnail)
            values
                ($1, $2, $3, $4, $5, $6, $7)
            returning id, name, lat, long, google_ID, thumbnail`, 
        [name, lat, long, username, hash, null, null])
        .then(data => {
            console.log(data);
            const u = new User(data.id, data.name, data.lat, data.long, username, data.google_ID, data.thumbnail);
            return u;
        });

    }
    // RETRIEVE
    static getAll() {
        return db.any(`
        select * from users order by id
    `).then(userArray => {

            // transform array of objects
            // into array of User instances
            const instanceArray = userArray.map(userObj => {
                const u = new User(userObj.id, userObj.name, userObj.lat, userObj.long, userObj.username, null, null, null);
                return u;
            });
            return instanceArray;
        })
    }
    static getById(id) {
        return db.one(`select * from users where id=$1`, [id])
        .then(userObj => new User(userObj.id, userObj.name, userObj.lat, userObj.long, userObj.username, userObj.pwhash, userObj.google_ID, userObj.thumbnail))
    }


    static getByUsername(username) {
        return db.one(`
            select * from users where username ilike '%$1:raw%'          
        `, [username])
        .then(data => {
            return new User(data.id, data.name, data.lat, data.long, username, data.pwhash, data.google_ID, data.thumbnail);
        })
    }

    static searchByName(name) {
        return db.any(`
        select * from users
            where name ilike '%$1:raw%'
    `, [name])
    }

    static searchByLocation(location) {
        return db.any(`select * from users
            where location ilike '%1:raw%'`, [location])
    }





    static getUsersGI(google_ID) {
        return db.one(`
        select * from users where google_ID=$1
    `, [google_ID]).then(userObj => {
            // transform array of objects
            // into array of User instances
            console.log(userObj);
            console.log('userObj in getUsers');
            const u = new User(userObj.id, userObj.name, userObj.lat, userObj.long, userObj.username, userObj.pwhash, google_ID, userObj.thumbnail);
            return u;
        }).catch(
            () => {
                return false;
            }
        )
    }

    getFavBody() {
        return db.any(`
        select *
                from bodies
                join
                (select body_id
                from users
                join favorites
                on user_id=id
                where user_id=$1) uf
                on body_id=id
    `, [this.id])
    .then(bodies => bodies.map( body => new Body(body.id,body.name,body.body_type)))
    }

    getFriends() {
        return db.any(`
        select *
        from users
        join
        (select friends.friend_id
        from friends
        join
        users
        on user_id_a=id
        where users.name=$1) fID
        on fID.friend_id=id
        `, [this.name])
            .then(friends => friends.map(friend => new User(friend.id, friend.name, friend.lat, friend.long, friend.username, friend.pwhash, friend.google_ID, friend.thumbnail)))
    }


    passwordDoesMatch(thePassword) {
        const didMatch = bcrypt.compareSync(thePassword, this.pwhash);
        return didMatch;
    }


    // UPDATE
    updateName(name) {
        this.name = name;
        return db.result(`
        update users
            set name=$2
        where id=$1
    `, [this.id, name])
            .then(result => {
                return result.rowCount === 1;

            })
    }

    addFavBody(spaceBody) {
        return db.any(`
        insert into favorites(body_id, user_id) values($1,$2)
        `, [spaceBody.id, this.id])
    }

    addFriend(friend) {
        return db.any(`
        insert into friends(user_id_a, friend_id) values($1,$2)
        `, [friend.id, this.id])
        .then(() => {
        return db.any(`insert into friends(user_id_a, friend_id) values($1,$2)
            `, [this.id, friend.id])
        })
    }


    updateLocation(lat, lon) {
        this.lat = lat
        this.lon = lon
        return db.result(`
        update users 
            set lat=$2, lon=$3
        where id=$1`,
                [this.id, lat, lon])
            .then(result => {
                return result.rowCount === 1;
            })
    }
    // DELETE
    delete() {
        return db.result(`
    delete from users
    where id = $1
    `, [this.id]);
    }

    static deleteById(id) {
        return db.result(`
    delete from users
    where id = $1
    `, [id]);
    }


}


module.exports = User;