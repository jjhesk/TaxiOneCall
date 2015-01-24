package com.hkm.driverview.common;


import android.content.Context;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;

public class NetworkStatusHelper {

    public static boolean isNetworkConnected = true;

    /**
     * Returns true if device is connected to a network, false if device is not connected to a network.
     * @param context
     * @return true | false
     */
    public static boolean isNetworkConnected(Context context) {
        ConnectivityManager conMgr = (ConnectivityManager)(context.getSystemService(Context.CONNECTIVITY_SERVICE));
        NetworkInfo activeNetwork = conMgr.getActiveNetworkInfo();

        if(activeNetwork != null && activeNetwork.isConnected()) {
            isNetworkConnected = true;
        } else {
            isNetworkConnected = false;
        }

        return isNetworkConnected;
    }

    public static void handleConnectivityChange(Context context) {
        if(isNetworkConnected(context)) {
            APIHelper.runQueue();
        } else {
            APIHelper.pauseQueue();
        }
    }

}