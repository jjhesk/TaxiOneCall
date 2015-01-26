package com.hkm.driverview.schema;

import com.asynhkm.productchecker.Model.gsonModel;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.driverview.common.Config;

/**
 * Created by hesk on 1/26/2015.
 */
public class Credential extends gsonModel {
    private String token, user, email;
    private boolean expires;

    public static void parse(final String data) {
        GsonBuilder gb = new GsonBuilder();
        Gson gs = gb.create();
        Config.credential_object = gs.fromJson(data, Credential.class);
    }

    @Override
    public boolean checkComplete() {
        return false;
    }

    public String getEmail() {
        return email;
    }

    public String getToken() {
        return token;
    }

    public String getUserId() {
        return user;
    }
}
