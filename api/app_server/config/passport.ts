import { use } from "passport";
import { Strategy } from "passport-local";
import { User } from "../models/users";


use( new Strategy( {
    usernameField: 'email'
    },
    (username, password, done) => {
        User.findOne( {email: username}, (err: any, user: any) => {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null,user);
        });
    }
));
