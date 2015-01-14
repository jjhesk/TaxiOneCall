package com.example.hesk.myapplication.pixeldemo;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.example.hesk.myapplication.R;
import com.pixelad.AdControl;

public class crazyAd extends Activity {
    /** Called when the activity is first created. */
	@Override
	public void onResume() {
		super.onResume();
	}
	@Override
   	public void onCreate(Bundle savedInstanceState) {
      super.onCreate(savedInstanceState);
      setContentView(R.layout.crazyad);
		loadAd();

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