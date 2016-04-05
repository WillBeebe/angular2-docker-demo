var mongoose = require('mongoose');
var acl          = require('mongoose-acl');

var Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    name: { type: String },
    password: { type: String },
    admin: { type: Boolean },
    email: { type: String },
    emailVerified: { type: Boolean, default: false },
    // TODO: http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose
    loginAttempts: { type: Number, required: true, default: 0 },
    lockUntil: { type: Number }
});

UserSchema.plugin(acl.subject);

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', UserSchema);;
