package com.hkm.taxicallandroid.schema;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.taxicallandroid.CommonPack.Config;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

/**
 * Created by hesk on 1/10/2015.
 */
public class DataCallOrder {
    private String
            phonenumber = "",
            gps = "00000,0000",
            type = "",
            destination = "",
            city = "",
            mylocation = "";


    public void setPhonenumber(String k) {
        phonenumber = k;
    }

    public void setgps(String k) {
        gps = k;
    }

    public void setcity(String k) {
        city = k;
    }

    public String getCity() {
        return city;
    }

    public String getnumber() {
        return phonenumber;
    }

    public void setDestination(String dstin) {
        destination = dstin;
    }

    public void setType(String ht) {
        type = ht;
    }

    public void setStartLocation(String dstin) {
        mylocation = dstin;
    }

    public String consolidate() {
        final GsonBuilder gsonb = new GsonBuilder();
        String request_body = "";
        Gson gson = gsonb.create();
        request_body = gson.toJson(this);
        return request_body;
    }

    public boolean checkComplete() throws Exception, NullPointerException {
        if (phonenumber.equalsIgnoreCase("") || phonenumber == null)
            throw new Exception("phone number is not complete");
      /*  if (gps.equalsIgnoreCase("") || gps == null)
            throw new NullPointerException("gps is not complete");*/
        if (type.equalsIgnoreCase("") || type == null)
            throw new NullPointerException("type is not complete");
        if (destination.equalsIgnoreCase("") || destination == null)
            throw new NullPointerException("destination is not complete");
        if (mylocation.equalsIgnoreCase("") || mylocation == null)
            throw new NullPointerException("mylocation is not complete");

        Config.current_order = this;
        return true;
    }
}
