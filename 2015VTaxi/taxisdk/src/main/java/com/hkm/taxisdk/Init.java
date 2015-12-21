package com.hkm.taxisdk;

import android.app.Application;

import com.parse.Parse;

/**
 * Created by zJJ on 12/22/2015.
 */
public class Init {

    public static void start(Application app) {
        // [Optional] Power your app with Local Datastore. For more info, go to
// https://parse.com/docs/android/guide#local-datastore
        Parse.enableLocalDatastore(app);
        Parse.initialize(app);
    }
}
