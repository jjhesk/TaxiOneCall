/**
 * Created by hesk on 12/21/2014.
 */
var keystone = require('keystone'),
    Types = keystone.Field.Types;

var Tokenized = new keystone.List('Tokenized', {
    nocreate: true,
    noedit: true
});

Tokenized.add({
    user: {type: Types.Relationship, ref: 'User'},
    expire: {type: Types.Datetime},
    token: {type: Types.Text},
    object: {
        type: Types.Select,
        options: [
            {value: 'registration', label: 'registration'},
            {value: 'login', label: 'login'},
            {value: 'verification-1', label: 'verification-1'},
            {value: 'verification-2', label: 'verification-2'}
        ],
        default: 'registration'
    }
});

Tokenized.defaultColumns = 'object, token, expire, user';
Tokenized.register();