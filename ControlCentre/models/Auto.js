var keystone = require('keystone'),
    tool = require('../lib/handler/checker'),
    Types = keystone.Field.Types;

var Auto = new keystone.List('Auto', {
    nocreate: false,
    noedit: false
});

Auto.add({
    autoType: {
        initial: true, required: true,
        type: Types.Select,
        options: [
            {value: 'taxi-blue', label: 'Taxi Blue'},
            {value: 'taxi-green', label: 'Taxi Green'},
            {value: 'taxi-red', label: 'Taxi Red'},
            {value: 'van', label: 'Van'},
            {value: 'limo', label: 'Limo'}
        ],
        default: 'taxi-red'
    },
    licensePlate: {type: Types.Text,  label: "License Plate"},
    driver: {type: Types.Relationship, ref: 'User'}
});

Auto.defaultColumns = 'autoType|20%, licensePlate|20%, driver|20%';
/*Auto.schema.pre('save', function (next) {
    // if (this.isModified('key') && !this.createdAt) {
    //     this.createdAt = new Date();
    // }
    next();
});*/
Auto.register();