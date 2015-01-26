package com.hkm.taxicallandroid.schema;

/**
 * Created by hesk on 1/25/2015.
 */
public class check_order_obj {
    private String
            taxi_id, taxi_license,
            caller, est_time, driver_name;
    private boolean status;

    public check_order_obj() {

    }

    public boolean replied() {
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
}