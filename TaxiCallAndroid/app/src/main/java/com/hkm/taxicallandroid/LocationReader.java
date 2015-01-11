package com.hkm.taxicallandroid;

import android.content.Context;
import android.content.SharedPreferences;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;

import com.hkm.taxicallandroid.schema.DataCallOrder;

import java.io.IOException;
import java.util.List;
import java.util.Locale;

/**
 * Created by hesk on 1/10/2015.
 */
public class LocationReader implements LocationListener {
    private Context _app_context;
    private LocationManager locationManager;
    private SharedPreferences SP;

    private DataCallOrder mDataCallOrder;
    private LocationReader.callback cb;
    private Criteria criteria;
    private String provider, gps;
    public static String
            sharepreferencename_tag = "ONECALLTAXI",
            phonegps_tag = "GPS";

    public LocationReader(DataCallOrder m, Context service_context, LocationReader.callback mcb) {
        cb = mcb;
        mDataCallOrder = m;
        _app_context = service_context;
        SP = _app_context.getApplicationContext().getSharedPreferences(LocationReader.sharepreferencename_tag, Context.MODE_PRIVATE);
        gps = SP.getString(LocationReader.phonegps_tag, "");
        if (!gps.equalsIgnoreCase("")) mDataCallOrder.setgps(gps);
    }

    private void save_gps(String pos) {
        SP.edit().putString(LocationReader.phonegps_tag, pos).apply();
        mDataCallOrder.setgps(pos);
    }

    public void enableGPS() {

        criteria = new Criteria();
        criteria.setAccuracy(Criteria.ACCURACY_FINE);
        locationManager = (LocationManager) _app_context.getSystemService(Context.LOCATION_SERVICE);
        List<String> providers = locationManager.getProviders(criteria, true);

        provider = locationManager.getBestProvider(criteria, true);
        locationManager.requestLocationUpdates(provider, 400, 1, this);
        //locationManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 5000, 10, this);

    }

    private void disableGPS() {
        locationManager.removeUpdates(this);
    }

    @Override
    public void onLocationChanged(Location loc) {

        String cityName = null;
        Geocoder gcd = new Geocoder(_app_context, Locale.getDefault());
        List<Address> addresses;

        try {
            addresses = gcd.getFromLocation(loc.getLatitude(),
                    loc.getLongitude(), 1);
            if (addresses.size() > 0)
                System.out.println(addresses.get(0).getLocality());

            mDataCallOrder.setcity(addresses.get(0).getLocality());
        } catch (IOException e) {
            e.printStackTrace();
        }

        StringBuilder sb = new StringBuilder();
        sb.append(loc.getLongitude())
                .append(";")
                .append(loc.getLatitude())
        ;
        save_gps(sb.toString());
        //disableGPS();
    }

    @Override
    public void onStatusChanged(String provider, int status, Bundle extras) {

    }

    @Override
    public void onProviderEnabled(String provider) {

    }

    @Override
    public void onProviderDisabled(String provider) {

    }

    public interface callback {
        public void completeRequest(DataCallOrder data);
    }

}
