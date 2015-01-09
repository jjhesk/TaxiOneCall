/**
 * Created by Hesk on 14年10月13日.
 */

//callback from confirmation buttons
function cb_confirmation(n) {
    if (n == 1) {
        //this is the part for internal application API
        // this is the part for internal application API -> check other products
        if (typeof Android === "object") {
            Android.on_form_complete("This redemption process is successful");
        } else if (typeof on_form_complete === "function") {
            //ios build in function call
            on_form_complete("This redemption process is successful.");
        }

    }
    if (n == 0) {
        //this is the part for internal application API
        //this is the part for internal application API  -> check the reward profile
        if (typeof Android === "object") {
            Android.on_page_return();
        } else if (typeof on_page_return === "function") {
            //ios build in function call
            on_page_return();
        }
    }
}

function native_message_box(text) {
    if (typeof Android === "object") {
        Android.on_message_box(text);
    } else if (typeof on_message_box === "function") {
        //ios build in function call
        on_message_box(text);
    } else {
        console.log(text);
    }
}

function native_notification(text) {
    if (typeof Android === "object") {
        Android.on_float_notification(text);
    } else if (typeof on_float_notification === "function") {
        //ios build in function call
        on_float_notification(text);
    } else {
        console.log(text);
    }
}