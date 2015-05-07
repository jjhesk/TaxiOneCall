/**
 * Created by hesk on 2/15/2015.
 */
var keystone = require('keystone'),
    tool = require('../lib/handler/checker'),
    Types = keystone.Field.Types;

var current_date = (new Date()).valueOf().toString();
var random = Math.random().toString();
var h1 = crypto.createHash('sha1').update(current_date + random + "2").digest('hex');
var h2 = crypto.createHash('sha1').update(current_date + random + "1").digest('hex');

var BaseProduct = new keystone.List('BaseProduct', {
    autokey: {path: 'slug', from: '_id', unique: true},
    map: {name: 'keyword'},
    defaultSort: '-createdAt'
});

BaseProduct.add({
    basetype: {
        initial: true, required: true,
        type: Types.Select,
        options: [
            {value: 'fchorizontal', label: 'Fai Chun Horizontal'},
            {value: 'fcvertical', label: 'Fai Chun Vertical'},
            {value: 'fcsq', label: 'Fai Chun Square'}
        ],
        default: 'fcsq'
    },
    keyword: {type: Types.Text, label: "Keyword"},
    driver: {type: Types.Relationship, ref: 'User'}
});

BaseProduct.defaultColumns = 'autoType|20%, licensePlate|20%, driver|20%';
/*Auto.schema.pre('save', function (next) {
 // if (this.isModified('key') && !this.createdAt) {
 //     this.createdAt = new Date();
 // }
 next();
 });*/
BaseProduct.register();