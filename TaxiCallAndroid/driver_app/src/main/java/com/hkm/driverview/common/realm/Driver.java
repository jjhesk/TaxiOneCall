package com.hkm.driverview.common.realm;

import io.realm.RealmObject;
import io.realm.annotations.PrimaryKey;

/**
 * Created by hesk on 3/15/2015.
 */
public class Driver extends RealmObject {


    @PrimaryKey
    private String email;
    private String drivername;
    private String loginpassword;
    private String phonenum;
    private String accessToken;

    public Driver() {
        drivername = "";
        loginpassword = "";
        phonenum = "";
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String n) {
        accessToken = n;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String n) {
        email = n;
    }

    public String getPhonenum() {
        return phonenum;
    }

    public void setPhonenum(String n) {
        phonenum = n;
    }

    public String getLoginpassword() {
        return loginpassword;
    }

    public void setLoginpassword(String n) {
        loginpassword = n;
    }

    public String getDrivername() {
        return drivername;
    }

    public void setDrivername(String n) {
        drivername = n;
    }
}
