var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {roles: ['Administrator']});

User.add({
    name: {type: Types.Name, required: true, index: true},
    email: {type: Types.Email, initial: true, required: true, index: true},
    password: {type: Types.Password, initial: true, required: true},
    cellPhone: {type: Types.Text},
    customization: {type: Types.Color},
    vcoinID: {type: Types.Text, label: "vCoin Account UUID"},
    licenseID: {type: Types.Text, label: "website URL"}
}, 'Notification', {
    notifications: {
        posts: {type: String},
        meetups: {type: String}
    }
}, 'Permissions', {
    state: {
        type: Types.Select,
        options: [
            {value: 'enabled', label: 'Enabled'},
            {value: 'disabled', label: 'Disabled'}
        ],
        default: 'enabled'
    },
    isVerified: {type: Boolean, label: 'Account Verification'},
    isAdmin: {type: Boolean, label: 'Can access Keystone', index: true},
    roles: {type: Types.Relationship, ref: 'Role', many: true, initial: true, default: ['Driver']}
});
//User.relationship({ref: 'Product', path: 'issuer'});
// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function () {
    return this.isAdmin;
});

/**
 * Relationships
 */
//User.relationship({ref: 'Maker', path: 'makerName'});

/**
 * Registration
 */
User.defaultColumns = 'name, cellPhone, email, roles';
User.register();