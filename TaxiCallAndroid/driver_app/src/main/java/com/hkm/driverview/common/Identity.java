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
            phone_num = "PHONE_NUM",
            email_tag = "DRIVER_EMAIL";
    private SharedPreferences SP;
    private String
            email = "",
            pass = "",
            mac_id = "",
            num = "";
    private Context __ctx;

    public Identity(Context service_context) {
        __ctx = service_context;
        SP = __ctx.getApplicationContext().getSharedPreferences(Identity.sharepreferencename_tag, Context.MODE_PRIVATE);
        mac_id = Tool.get_mac_address(__ctx);
        email = SP.getString(Identity.email_tag, "");
        pass = SP.getString(Identity.pass_tag, "");
        num = SP.getString(Identity.phone_num, "");
    }

    public boolean hasAuthen() {
        return !(email.equalsIgnoreCase("") || pass.equalsIgnoreCase("")
                || num.equalsIgnoreCase(""));
    }

    public void saveAuthen(final String email, final String pass, final String num) {
        SharedPreferences.Editor ed = SP.edit();
        ed.putString(Identity.email_tag, email);
        ed.putString(Identity.pass_tag, pass);
        ed.putString(Identity.phone_num, num);
        ed.commit();
    }

    public String getEmail() {
        return email;
    }

    public String getPass() {
        return pass;
    }

    public String getNumbr() {
        return num;
    }
}
