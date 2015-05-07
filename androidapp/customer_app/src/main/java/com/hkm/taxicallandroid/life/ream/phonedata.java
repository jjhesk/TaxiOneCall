package com.hkm.taxicallandroid.life.ream;

import io.realm.RealmObject;

/**
 * Created by hesk on 4/9/2015.
 */
public class phonedata extends RealmObject {
    private String phonenum = "";
    private String transportation = "";

    public phonedata() {

    }

    public void setPhonenum(String num) {
        phonenum = num;
    }

    public String getPhonenum() {
        return phonenum;
    }

    public void setTransportation(String num) {
        transportation = num;
    }

    public String getTransportation() {
        return transportation;
    }
}
