/**
 * Created by Hesk on 2/1/2015.
 */
var keystone = require('keystone'),
    Types = keystone.Field.Types;
var Role = new keystone.List('Role', {
    autokey: {from: 'name', path: 'key', unique: true}
});
Role.add({
    name: {type: String, initial: true, index: true}
});
Role.relationship({ref: 'User', path: 'roles'});
Role.register();