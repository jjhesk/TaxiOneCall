package com.hkm.taxicallandroid.life;

import android.location.Address;
import android.location.Location;
import android.os.Build;

import com.google.android.gms.common.api.GoogleApiClient;
import com.hkm.taxicallandroid.schema.ConfirmCall;
import com.hkm.taxicallandroid.schema.DataCallOrder;
import com.hkm.taxicallandroid.schema.Report;

import java.util.List;

/**
 * Created by hesk on 4/8/2015.
 */
public class Config {
    public static String domain = "http://async777.com";

    public static class control {
        public final static String newcall = "/api/call/new/";
        public final static String login = "/api/account/login/";
        public final static String check = "/api/call/check/";
        public final static String confirm_order = "/api/call/confirm/";
        public final static String report_issue = "/api/call/report/";
        public final static String call_record_status = "/api/call/status/";
    }


    public static class _default {
        public final static int setlooptimer = 5000;
        public final static int timer = 1000;
        public final static int vibe_length = 1000;
    }


    public static final int SUCCESS_RESULT = 0;
    public static final int FAILURE_RESULT = 1;
    public static final String PACKAGE_NAME = "com.hkm.taxicall.locationaddress";
    public static final String RECEIVER = PACKAGE_NAME + ".RECEIVER";
    public static final String RESULT_DATA_KEY = PACKAGE_NAME + ".RESULT_DATA_KEY";
    public static final String LOCATION_DATA_EXTRA = PACKAGE_NAME + ".LOCATION_DATA_EXTRA";
    public static final String RESULTMSG = PACKAGE_NAME + ".RESULTMSG";

    public static ConfirmCall online_order;
    public static DataCallOrder current_order;
    public static Report c_report;
    public static GoogleApiClient mGoogleApiClient;
    public static Location mLastLocation;
    public static List<Address> mAddress;
    public static final String PARSE_APPLICATION_ID = "yjvYZqY25oJbfkZCKYdspnFiSjNIg7n9GXm7YKJ0";
    public static final String PARSE_CLIENT_KEY = "eeJlDLPuK5sYS0H4tNuLA18hSDU93EjrW1kWTa2K";
}
