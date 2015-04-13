package com.hkm.taxicallandroid;

import android.app.Activity;
import android.content.Intent;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;

import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.api.GoogleApiClient;
import com.google.android.gms.location.LocationServices;
import com.hkm.taxicallandroid.life.Config;
import com.parse.ParseAnalytics;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Created by hesk on 2/1/2015.
 */
public class SlashScreen extends Activity implements
        GoogleApiClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener {
    public static final String TAG = "instart";
    private Geocoder geocoder;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        geocoder = new Geocoder(getBaseContext(), Locale.getDefault());
        ParseAnalytics.trackAppOpened(getIntent());
        buildGoogleApiClient();
        setContentView(R.layout.waiting);
    }

    protected synchronized void buildGoogleApiClient() {
        Config.mGoogleApiClient = new GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();

        Config.mGoogleApiClient.connect();
    }

    /* protected void startLocationUpdates() {
         LocationServices.FusedLocationApi.requestLocationUpdates(
                 mGoogleApiClient, mLocationRequest, this);
     }*/
    protected void get_address_first(Intent intent) {
        String errorMessage = "";
        // Get the location passed to this service through an extra.
        Location location = Config.mLastLocation;
        //intent.getParcelableExtra(Config.LOCATION_DATA_EXTRA);
        List<Address> addresses = null;

        try {
            addresses = geocoder.getFromLocation(
                    location.getLatitude(),
                    location.getLongitude(),
                    // In this sample, get just a single address.
                    1);
        } catch (IOException ioException) {
            // Catch network or other I/O problems.
            errorMessage = getString(R.string.service_not_available);
            Log.e(TAG, errorMessage, ioException);
        } catch (IllegalArgumentException illegalArgumentException) {
            // Catch invalid latitude or longitude values.
            errorMessage = getString(R.string.invalid_lat_long_used);
            Log.e(TAG, errorMessage + ". " +
                    "Latitude = " + location.getLatitude() +
                    ", Longitude = " +
                    location.getLongitude(), illegalArgumentException);
        } catch (Exception e) {
            Log.e(TAG, "the location cv.");

        }

        // Handle case where no address was found.
        if (addresses == null || addresses.size() == 0) {
            if (errorMessage.isEmpty()) {
                errorMessage = getString(R.string.no_address_found);
                Log.e(TAG, errorMessage);
            }
            // deliverResultToReceiver(Config.FAILURE_RESULT, errorMessage);

        } else {
            Config.mAddress = addresses;
            errorMessage = getString(R.string.address_found);
            Log.i(TAG, errorMessage);
        }
        result_end_here(errorMessage);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    private void result_end_here(String message) {
        final Intent intent = new Intent(this, OrderPanel.class);
        intent.putExtra(Config.RESULTMSG, message);
        startActivity(intent);
        finish();
    }

    @Override
    public void onConnected(Bundle bundle) {
        Config.mLastLocation = LocationServices.FusedLocationApi.getLastLocation(Config.mGoogleApiClient);
        if (Config.mLastLocation != null) {
            //mLatitudeText.setText(String.valueOf(Config.mLastLocation.getLatitude()));
            //mLongitudeText.setText(String.valueOf(Config.mLastLocation.getLongitude()));
        }
        get_address_first(getIntent());
    }

    @Override
    public void onConnectionSuspended(int i) {

    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {

    }
}
