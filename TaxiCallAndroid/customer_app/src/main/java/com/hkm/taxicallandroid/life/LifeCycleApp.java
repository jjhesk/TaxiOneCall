package com.hkm.taxicallandroid.life;

import android.app.Application;

import com.asynhkm.productchecker.Util.Tool;
import com.parse.Parse;
import com.parse.ParseCrashReporting;
import com.squareup.picasso.Picasso;

import io.realm.Realm;

/**
 * Created by hesk on 4/8/2015.
 */
public class LifeCycleApp extends Application {
    private String
            licenseKey = "",
            productKey = "",
            mac_id = "",
            login = "",
            pass = "";
    public static String STANDARD_KEY_COOKIE = "COOKIESTD";
    protected Picasso pic;
    protected Realm realm;

    private void initParse() {
        /*ParsePush.subscribeInBackground("", new SaveCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    Log.d(Config.PARSETAG, "successfully subscribed to the broadcast channel.");
                } else {
                    Log.e(Config.PARSETAG, "failed to subscribe for push", e);
                }
            }
        });*/
        // Enable Crash Reporting
        ParseCrashReporting.enable(this);
        // ENABLE PARSE IN HERE
        Parse.enableLocalDatastore(this);
        // Enable and initialize the parse application
        Parse.initialize(this, Config.PARSE_APPLICATION_ID, Config.PARSE_CLIENT_KEY);
    }

    @Override
    public void onCreate() {
        super.onCreate();
        initParse();
        pic = Picasso.with(this);
        mac_id = Tool.get_mac_address(this);
        try {
            realm = Realm.getInstance(this);
            RealmGetData();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Picasso getInstancePicasso() {
        return pic;
    }

    private void RealmGetData() {
      /*  realm.beginTransaction();
        RealmQuery<WishedItem> wishedItemRealmQuery = realm.where(WishedItem.class);
        RealmResults<WishedItem> wishedItemRealmResults = wishedItemRealmQuery.findAll();
        retent.WItems.clear();
        retent.WItems.addAll(wishedItemRealmResults);
        realm.commitTransaction();*/
        realm.executeTransaction(new Realm.Transaction() {
            @Override
            public void execute(Realm realm) {

                 /*   RealmQuery<WishedItem> wishedItemRealmQuery = realm.where(WishedItem.class);
                    RealmResults<WishedItem> wishedItemRealmResults = wishedItemRealmQuery.findAll();
                    retent.WItems.clear();
                    retent.WItems.addAll(wishedItemRealmResults);


                    RealmQuery<elementHome> elementHomeRealmQuery = realm.where(elementHome.class);
                    RealmResults<elementHome> elementHomeRealmResults = elementHomeRealmQuery.findAll();
                    retent.home_elements.clear();
                    retent.home_elements.addAll(elementHomeRealmResults);

                    APPSettings appSettingsItem = realm.where(APPSettings.class).findAll().last();
                    if (appSettingsItem != null)
                        retent.appSettings.setShopping_bag_current_item(appSettingsItem.getShopping_bag_current_item());
*/

            }
        });

    }


    @Override
    public void onLowMemory() {
        super.onLowMemory();
    }

    @Override
    public void onTerminate() {
        super.onTerminate();
    }

}