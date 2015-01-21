var keystone = require('keystone'),
    tool = require('../lib/handler/checker'),
    Types = keystone.Field.Types;

var Call = new keystone.List('Call', {
    nocreate: false,
    noedit: false
});

Call.add({
    calltype: {
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
    callnumber: {type: Types.Text, noedit: true, label: "Phone number?"},
    calltime: {type: Date, default: Date.now, noedit: true, label: "Calling time"},
    dealstatus: {
        default: 'public', type: Types.Select,
        options: [
            {value: 'public', label: 'New Public'},
            {value: 'taken', label: 'Taken'},
            {value: 'paid', label: 'Paid'}
        ], noedit: true, label: "Calling Status"
    }
}, 'Call Data', {
    customer: {type: Types.Boolean, default: false},
    position: {type: Types.Text, noedit: true, label: "Position GPS"},
    estimate: {type: Types.Text, noedit: true, label: "The estimation of the Address"},
    passengers: {type: Types.Number, noedit: true, label: "How many people?", default: 1},
    pickup: {type: Types.Text, noedit: true, label: "Pick Up Location"},
    destination: {type: Types.Text, noedit: true, label: "Location to go?"}
}, 'Deal', {
    costconfirm: {type: Types.Number, default: 0, label: "Final cost"}
});
Call.defaultColumns = 'dealstatus|20%, calltime|20%, callnumber|20%';
Call.schema.pre('save', function (next) {
    // if (this.isModified('key') && !this.createdAt) {
    //     this.createdAt = new Date();
    // }
    next();
});
Call.register();