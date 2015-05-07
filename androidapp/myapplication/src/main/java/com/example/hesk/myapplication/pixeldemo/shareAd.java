package com.example.hesk.myapplication.pixeldemo;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.example.hesk.myapplication.R;
import com.pixelad.AdControl;

public class shareAd extends Activity {
    /** Called when the activity is first created. */
	
	@SuppressLint("NewApi")
	@Override
   	public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      AdControl.onCreate(this, savedInstanceState, "com.pixel");
      AdControl.setWeiboKey("586820832");
      AdControl.setTwitterKey("A2WsFLoMjNq2zHEyqYNMaplI5", "JqXXTwVpqPBD3yYjDwGpcGEuu8UQWmrD3L9Ci2T9fEXhhrmAeQ");
      setContentView(R.layout.sharead);
	  loadAd();
   	}
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        AdControl.onSaveInstanceState(outState);
    }
	@Override
	public void onResume() {
		super.onResume();
		AdControl.onResume();
	}
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        AdControl.onActivityResult(requestCode, resultCode, data);
    }
    @Override
    public void onPause() {
        super.onPause();
        AdControl.onPause();
    }
    @Override
    public void onDestroy() {
        super.onDestroy();
        AdControl.onDestroy();
    }
    
    public void loadAd() {
        final AdControl adControl=(AdControl)this.findViewById(R.id.AdControl);
        adControl.setOnPMAdListener(new AdControl.OnPMAdListener() {
    		@Override
    		public void onFeedCompleted() {
    			// TODO Auto-generated method stub
    			adControl.log("bannerAd", "onFeedCompleted");
    		}
    		
    		@Override
    		public void onFailedToLoad(Exception exception) {
    			// TODO Auto-generated method stub
    			adControl.log("bannerAd", "onFailedToLoad: " + exception.getMessage());
    		}
    		
    		@Override
    		public void onBrowserClosed() {
    			// TODO Auto-generated method stub
    			adControl.log("bannerAd", "OnBrowserClose");
    		}
    		
    		@Override
    		public void onAdLoadCompleted() {
    			// TODO Auto-generated method stub
    			adControl.log("bannerAd", "OnAdCompleted");
    		}
    	});

        String latitude = getIntent().getStringExtra("latitude");
        String longitude = getIntent().getStringExtra("longitude");
        if (latitude.equals("") && longitude.equals("")){
     	   adControl.setSID(getIntent().getStringExtra("sid"));
        }else{
     	   adControl.setSID(getIntent().getStringExtra("sid"),Double.parseDouble(latitude),Double.parseDouble(longitude));
        }
 	   	if (getIntent().getBooleanExtra("debug",false)){
		   adControl.initDebug((TextView)this.findViewById(R.id.timerText),(EditText)this.findViewById(R.id.debugText)); 
 	   	}else{
	    	((EditText)this.findViewById(R.id.debugText)).setVisibility(View.INVISIBLE);
	    }
    }
}