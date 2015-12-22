package com.hkm.taxisdk;

import android.app.Application;

import com.parse.Parse;

/**
 * Created by zJJ on 12/22/2015.
 */
public class InitOrderSide extends Application {

    public static void start(Application app) {
        // [Optional] Power your app with Local Datastore. For more info, go to
        // https://parse.com/docs/android/guide#local-datastore
        Parse.enableLocalDatastore(app);
        Parse.initialize(app);
    }

    /**
     * Called when the application is starting, before any activity, service,
     * or receiver objects (excluding content providers) have been created.
     * Implementations should be as quick as possible (for example using
     * lazy initialization of state) since the time spent in this function
     * directly impacts the performance of starting the first activity,
     * service, or receiver in a process.
     * If you override this method, be sure to call super.onCreate().
     */
    @Override
    public void onCreate() {
        super.onCreate();
        start(this);
    }
}
