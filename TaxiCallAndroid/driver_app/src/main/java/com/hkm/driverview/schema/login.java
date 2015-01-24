package com.hkm.driverview.schema;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.driverview.common.gsonModel;

/**
 * Created by hesk on 1/24/2015.
 */
public class login extends gsonModel {
    public String usernameemail, pass;

    public login(String musername, String mpass) {
        pass = mpass;
        usernameemail = musername;
    }

    public boolean checkComplete() {
        return
                !(usernameemail.isEmpty()
                        || pass.isEmpty()
                );
    }
}
