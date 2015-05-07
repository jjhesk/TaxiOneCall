package com.hkm.taxicallandroid.schema;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by hesk on 1/25/2015.
 */
public class Order_status {
    private String
            taxi_id, taxi_license,
            caller, est_time, driver_name;
    private int status;

    public Order_status() {

    }

    public int replied() {
        return status;
    }

    public String getTaxiId() {
        return taxi_id;
    }

    public String getLicense() {
        return taxi_license;
    }

    public String getCaller() {
        return caller;
    }

    public String getEstTime() {
        return est_time;
    }

    public String getDriverName() {
        return driver_name;
    }

    public static Order_status parse(final String data) {
        final GsonBuilder gsonb = new GsonBuilder();
        final Gson gson = gsonb.create();
        return gson.fromJson(data, Order_status.class);
    }
}