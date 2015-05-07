/**
 * Created by hesk on 1/26/2015.
 */
var keystone = require('keystone'),
    tool = require('../lib/handler/checker'),
    Types = keystone.Field.Types;
var Complain = new keystone.List('Complain', {
    nocreate: false,
    noedit: false
});

Complain.add({
    callId: {type: Types.Relationship, ref: 'Call', label: "Call Record", noedit: true},
    driver: {type: Types.Relationship, ref: 'User', label: "Driver name", noedit: true},
    reportTime: {type: Date, default: Date.now, noedit: true, label: "Reporting Time"},
    issueContent: {type: Types.Text, label: "Content of Issue"},
    status: {
        initial: true, required: true,
        type: Types.Select,
        options: [
            {value: 'new', label: 'new case'},
            {value: 'reviewed', label: 'reviewed'},
            {value: 'resolved', label: 'resolved'}
        ],
        label: "Status of Issue",
        default: 'new'
    }
});
Complain.defaultColumns = 'status|20%, driver|20%, issueContent|30%';
Complain.schema.pre('save', function (next) {
    // if (this.isModified('key') && !this.createdAt) {
    //     this.createdAt = new Date();
    // }
    next();
});
Complain.register();