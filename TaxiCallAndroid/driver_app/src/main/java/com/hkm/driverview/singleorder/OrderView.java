package com.hkm.driverview.singleorder;

import android.app.Activity;
import android.graphics.Point;
import android.location.Location;
import android.os.Bundle;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.Projection;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.hkm.driverview.R;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.common.schema.DealFace;
import com.hkm.driverview.ui.DialogTools;

/**
 * Created by hesk on 1/25/2015.
 */
public class OrderView extends Activity
        implements GoogleMap.OnMarkerDragListener,
        GoogleMap.OnMyLocationButtonClickListener,
        GoogleMap.OnMyLocationChangeListener {

    private static final String TAG = OrderView.class.getSimpleName();
    private GoogleMap mMap;
    protected MarkerOptions mo;
    private Marker markerP;
    protected LatLng currentLatLng, mylocation;
    protected int mapType = GoogleMap.MAP_TYPE_NORMAL;
    protected float cameraZoom;


    private DialogTools dialog_collection;
    private DriverControl driver_control;
    private static DealFace dealSet;

    protected Bundle saved_instance;

    protected boolean hasSavedInstance() {
        return saved_instance != null;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.act_order);
        orderFragement of = (orderFragement) getFragmentManager().findFragmentById(R.id.order_fragement);
        dialog_collection = new DialogTools(this);
        driver_control = new DriverControl(new DialogTools(this), new DealFace(), new Identity(this), of);
        driver_control.initView(this);
        of.setDriverControl(driver_control);

        if (mMap == null) {
            // Try to obtain the map from the SupportMapFragment.
            MapFragment mf = (MapFragment) getFragmentManager().findFragmentById(R.id.map);
            mMap = mf.getMap();
            if (mMap != null) {
                installMap();
            }
        }

        //setDealReportTime
    }

    private void installMap() {
        final BitmapDescriptor Bdescriptor = BitmapDescriptorFactory.fromResource(R.drawable.car);
        mo = new MarkerOptions()
                .position(currentLatLng)
                        //  .snippet("Job" + Content.current_job_task.getID())
                        //.title("Job" + Content.current_job_task.getID())
                .icon(Bdescriptor)
                .draggable(true);
        // .flat(true);
        //.rotation(3f);

        mMap.setMyLocationEnabled(true);
        mMap.getUiSettings().setCompassEnabled(true);
        mMap.getUiSettings().setZoomControlsEnabled(true);
        mMap.getUiSettings().setMyLocationButtonEnabled(true);
        mMap.getUiSettings().setTiltGesturesEnabled(true);
        mMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
        mMap.setTrafficEnabled(false);
        mMap.setBuildingsEnabled(false);
        mMap.setIndoorEnabled(false);
        mMap.setOnMyLocationButtonClickListener(this);
        mMap.setOnMyLocationChangeListener(this);
        //  mMap.setPadding(0, 10, 0, 0);
        mMap.setOnMarkerDragListener(this);
        mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener() {
            @Override
            public boolean onMarkerClick(Marker marker) {
                final LatLng position = marker.getPosition();
                mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng, cameraZoom),1000,new com.androidmapsextensions.GoogleMap.CancelableCallback() {
                    @Override
                    public void onCancel() {
                        Projection projection = mMap.getProjection();
                        Point point = projection.toScreenLocation(position);
                        point.x -= 100;
                        point.y -= 100;
                        LatLng offsetPosition = projection.fromScreenLocation(point);
                        mMap.animateCamera(CameraUpdateFactory.newLatLng(offsetPosition), 300, null);
                    }

                    @Override
                    public void onFinish() {

                    }
                });
                return true;
            }
        });
        if (hasSavedInstance()) {
            mapType = saved_instance.getInt("map_type", GoogleMap.MAP_TYPE_NORMAL);
            double savedLat = saved_instance.getDouble("lat", 0.0000d);
            double savedLng = saved_instance.getDouble("lng", 0.0000d);
            currentLatLng = new LatLng(savedLat, savedLng);
            cameraZoom = saved_instance.getFloat("zoom", Config._default.cameraZoomDefault);
            markerP = mMap.addMarker(mo);
        } else {
            cameraZoom = Config._default.cameraZoomDefault;
        }
        //mMap.animateCamera(CameraUpdateFactory.newLatLngZoom(currentLatLng, cameraZoom));

    }

    @Override
    public void onBackPressed() {

    }

    @Override
    protected void onPause() {
        super.onPause();
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    public void onMarkerDragStart(Marker marker) {

    }

    @Override
    public void onMarkerDrag(Marker marker) {

    }

    @Override
    public void onMarkerDragEnd(Marker marker) {

    }

    @Override
    public boolean onMyLocationButtonClick() {
        return false;
    }

    @Override
    public void onMyLocationChange(Location location) {

    }
}
