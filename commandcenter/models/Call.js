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
            {value: 'public', label: 'New Fresh Public Request'},
            {value: 'stage1', label: 'Driver Accept'},
            {value: 'stage2', label: 'Driver Prompt Customer at the Pick Up location'},
            {value: 'stage3', label: 'Customer see and got pick up by the driver'},
            {value: 'taken', label: 'Taken'},
            {value: 'timeout', label: 'Ticket time out'},
            {value: 'removed_c', label: 'Remove by customer'}
        ], noedit: false, label: "Calling Status"
    },
    dealstatus_time: {type: Date, default: Date.now, noedit: true, label: "Status update time"}
}, 'Call Data', {
    customer: {type: Types.Boolean, default: false},
    position: {type: Types.Text, noedit: true, label: "Position GPS"},
    estimate: {type: Types.Text, noedit: true, label: "Estimate time of pick up reported by driver"},
    passengers: {type: Types.Number, noedit: true, label: "How many people?", default: 1},
    pickup: {type: Types.Text, noedit: true, label: "Pick Up Location"},
    destination: {type: Types.Text, noedit: true, label: "Location to go?"},
    remark_request: {type: Types.Text, noedit: true, label: "Additional Request"}
}, 'Deal', {
    costconfirm: {type: Types.Number, default: 0, label: "Final cost"},
    driver: {type: Types.Relationship, ref: 'User'}
});
Call.defaultColumns = 'dealstatus|20%, calltime|20%, callnumber|20%';
Call.schema.pre('save', function (next) {
    // if (this.isModified('key') && !this.createdAt) {
    //     this.createdAt = new Date();
    // }
    next();
});
Call.register();