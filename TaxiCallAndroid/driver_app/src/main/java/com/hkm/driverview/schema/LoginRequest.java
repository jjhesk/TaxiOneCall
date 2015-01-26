package com.hkm.driverview.schema;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.driverview.common.gsonModel;

/**
 * Created by hesk on 1/24/2015.
 */
public class LoginRequest extends gsonModel {
    public String login, pass;

    public LoginRequest(String musername, String mpass) {
        pass = mpass;
        login = musername;
    }

    public boolean checkComplete() {
        return
                !(login.isEmpty()
                        || pass.isEmpty()
                );
    }
}
