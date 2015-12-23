package com.hkm.taxisdk.api;

import android.content.Context;

import io.realm.RealmConfiguration;

/**
 * Created by hesk on 21/12/15.
 */
public class RealmUtil {


    public static RealmConfiguration realmCfg(Context app) {
        return new RealmConfiguration.Builder(app)
                .deleteRealmIfMigrationNeeded()
                .build();
    }
}
