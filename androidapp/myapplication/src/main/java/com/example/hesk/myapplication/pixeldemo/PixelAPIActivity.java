package com.example.hesk.myapplication.pixeldemo;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.location.Criteria;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.ToggleButton;

import com.example.hesk.myapplication.R;
import com.pixelad.Config;

public class PixelAPIActivity extends Activity implements LocationListener {
    /** Called when the activity is first created. */
	private LocationManager locManager;
	private String longitude = "";
	private String latitude = "";
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.pixelapidemo);
        final EditText banner_tf = (EditText)this.findViewById(R.id.banner_tf);
        final EditText fixed_tf = (EditText)this.findViewById(R.id.fixed_tf);
        final EditText splash_tf = (EditText)this.findViewById(R.id.splash_tf);
        final EditText crazy_tf = (EditText)this.findViewById(R.id.crazy_tf);
        final EditText media_tf = (EditText)this.findViewById(R.id.media_tf);
        final EditText overlay_tf = (EditText)this.findViewById(R.id.overlay_tf);
        final EditText selfie_tf = (EditText)this.findViewById(R.id.selfie_tf);
        final Button banner_button = (Button)this.findViewById(R.id.banner_button);
        final Button fixed_button = (Button)this.findViewById(R.id.fixed_button);
        final Button splash_button = (Button)this.findViewById(R.id.splash_button);
        final Button crazy_button = (Button)this.findViewById(R.id.crazy_button);
        final Button media_button = (Button)this.findViewById(R.id.media_button);
        final Button overlay_button = (Button)this.findViewById(R.id.overlay_button);
        final Button selfie_button = (Button)this.findViewById(R.id.selfie_button);
        final TextView headline=(TextView)this.findViewById(R.id.headline);
        final ToggleButton debugButton = (ToggleButton)this.findViewById(R.id.debugButton);
        final ToggleButton gpsButton = (ToggleButton)this.findViewById(R.id.gpsButton);
        final EditText precache_tf = (EditText)this.findViewById(R.id.precache_tf);
        final Button precache_button = (Button)this.findViewById(R.id.precache_button);
        headline.setText(headline.getText()+" (v"+ Config.VERSION()+")");
        banner_tf.setText("2160324011891");
        fixed_tf.setText("366162808917");
        splash_tf.setText("276951868918");
        crazy_tf.setText("710649998919");
        media_tf.setText("605796699213");
        overlay_tf.setText("592395878920");
        precache_tf.setText("6242523818142,6728585518143");
        selfie_tf.setText("504314048674");
        precache_button.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, preCacheAd.class);
				intent.putExtra("sid", precache_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				PixelAPIActivity.this.startActivity(intent);
			}
		});
        
        
        banner_button.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, bannerAd.class);
				intent.putExtra("sid", banner_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});
        fixed_button.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, fixedAd.class);
				intent.putExtra("sid", banner_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});
       splash_button.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, splashAd.class);
				intent.putExtra("sid", splash_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});
       crazy_button.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, crazyAd.class);
				intent.putExtra("sid", crazy_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});       
       media_button.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, mediaAd.class);
				intent.putExtra("sid", media_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});   
       overlay_button.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, overlayAd.class);
				intent.putExtra("sid", overlay_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});   	
       
       
       selfie_button.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				// TODO Auto-generated method stub
				Intent intent = new Intent();
				intent.setClass(PixelAPIActivity.this, shareAd.class);
				intent.putExtra("sid", selfie_tf.getText().toString());
				intent.putExtra("debug", debugButton.isChecked());	
				intent.putExtra("latitude", latitude);
				intent.putExtra("longitude", longitude);
				PixelAPIActivity.this.startActivity(intent);
			}
		});   	
			
       gpsButton.setOnClickListener(new View.OnClickListener() {
			@Override
			public void onClick(View v) {
				if (gpsButton.isChecked()){
					LocationManager status = (LocationManager) (PixelAPIActivity.this.getSystemService(Context.LOCATION_SERVICE));
					if (status.isProviderEnabled(LocationManager.GPS_PROVIDER) || status.isProviderEnabled(LocationManager.NETWORK_PROVIDER)) {
						locManager = (LocationManager) getSystemService(LOCATION_SERVICE);	
						Criteria criteria = new Criteria();	
						String bestProvider = locManager.getBestProvider(criteria, true);
						locManager.requestLocationUpdates(LocationManager.GPS_PROVIDER, 1000, 1, PixelAPIActivity.this);
						Location location = locManager.getLastKnownLocation(bestProvider);
						try{
							longitude = Double.toString(location.getLongitude());
							latitude = Double.toString(location.getLatitude());
						}catch(Exception ex){
							latitude  = "";
							longitude = "";	
						}
					} else {
						Toast.makeText(PixelAPIActivity.this, "Please Open GPS", Toast.LENGTH_LONG).show();
					}
				}else{
					try{
						locManager.removeUpdates(PixelAPIActivity.this);
					}catch(Exception ex){}
					latitude  = "";
					longitude = "";
				}
			}
		});
       //precacheHandler.start();
    }
	@Override
	public void onLocationChanged(Location location) {
		// TODO Auto-generated method stub
		try{
			longitude = Double.toString(location.getLongitude());
			latitude = Double.toString(location.getLatitude());
		}catch(Exception ex){
			Log.v("",ex.toString());
		}
	}

	@Override
	public void onProviderDisabled(String arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onProviderEnabled(String arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onStatusChanged(String arg0, int arg1, Bundle arg2) {
		// TODO Auto-generated method stub
		
	}
}

