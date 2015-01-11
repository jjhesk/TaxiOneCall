/**
 * Created by Hesk on 14年12月16日.
 */
var keystone = require('keystone'),
    User = keystone.list('User');


exports = module.exports = function (req, res) {
    if (err) return res.apiResponse({ success: false, err: err });
    return res.apiResponse({ success: true });


    //  console.log(req, req.user._id);
    /* User.model.findOne()
     .where('who', req.user._id)
     .where('meetup', req.body.meetup)
     .exec(function (err, rsvp) {
     if (req.body.statusOnly) {
     return res.apiResponse({
     success: true,
     rsvped: rsvp ? true : false,
     attending: rsvp && rsvp.attending ? true : false
     });

     } else {

     if (rsvp) {

     rsvp.set({
     attending: req.body.attending
     }).save(function (err) {
     if (err) return res.apiResponse({ success: false, err: err });
     return res.apiResponse({ success: true });
     });

     } else {

     new User.model({
     meetup: req.body.meetup,
     who: req.user,
     attending: req.body.attending
     }).save(function (err) {
     if (err) return res.apiResponse({ success: false, err: err });
     return res.apiResponse({ success: true });
     });
     }
     }
     });*/


}