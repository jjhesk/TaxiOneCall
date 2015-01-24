package com.hkm.driverview.common;

import android.content.Context;
import android.content.SharedPreferences;

import com.asynhkm.productchecker.Util.Tool;

/**
 * Created by hesk on 1/24/2015.
 */
public class Identity {
    public static String
            sharepreferencename_tag = "ONECALLTAXI",
            pass_tag = "DRIVER_PASS",
            email_tag = "DRIVER_EMAIL";
    private SharedPreferences SP;
    private String
            email = "",
            pass = "",
            mac_id = "";
    private Context __ctx;

    public Identity(Context service_context) {
        __ctx = service_context;
        SP = __ctx.getApplicationContext().getSharedPreferences(Identity.sharepreferencename_tag, Context.MODE_PRIVATE);
        mac_id = Tool.get_mac_address(__ctx);
        email = SP.getString(Identity.email_tag, "");
        pass = SP.getString(Identity.pass_tag, "");
    }

    public boolean hasAuthen() {
        return !(email.equalsIgnoreCase("") || pass.equalsIgnoreCase(""));
    }

    public void saveAuthen(String email, String pass) {
        SP.edit()
                .putString(Identity.email_tag, email)
                .putString(Identity.pass_tag, pass)
                .apply();
    }

    public String getEmail() {
        return email;
    }

    public String getPass() {
        return pass;
    }
}
