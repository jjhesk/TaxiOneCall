package com.hkm.driverview.common;

import android.app.Application;

import com.hkm.driverview.common.realm.Driver;

import io.realm.Realm;

/**
 * Created by hesk on 3/15/2015.
 */
public class AppBase extends Application {
    public final static Driver diver = new Driver();
    private Realm realm;

    @Override
    public void onCreate() {
        super.onCreate();

    }

    public void RegisterNewUser(Driver dr) {
        realm = Realm.getInstance(this);
        realm.beginTransaction();
        Driver dd = realm.copyToRealm(dr);
        realm.commitTransaction();
    }


}
