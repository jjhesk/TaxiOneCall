package com.example.hesk.myapplication.pixeldemo;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.hesk.myapplication.R;
import com.pixelad.PreCacheHandler;

public class preCacheAd extends Activity {
   
    public static final int DIALOG_DOWNLOAD_PROGRESS = 0;
    private Button startBtn;
    private Button stopBtn;
    private Button moveBtn;
    private Button clearBtn; 
    private Button stimeBtn;
    private PreCacheHandler pHandler;
    private String sid = "";
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
               
        setContentView(R.layout.precachead);
        pHandler = new PreCacheHandler(this);
        
        this.sid = getIntent().getStringExtra("sid");
        
        
        startBtn = (Button)findViewById(R.id.startBtn);
        startBtn.setOnClickListener(new OnClickListener(){
            public void onClick(View v) {
            	setButtonsEnabled(false);
            	pHandler.setSIDs(sid);
            }
        });
        stopBtn = (Button)findViewById(R.id.stopBtn);
        stopBtn.setOnClickListener(new OnClickListener(){
            public void onClick(View v) {
            	setButtonsEnabled(true);
            	pHandler.stopPreCache(true);
            }
        });
        
        moveBtn = (Button)findViewById(R.id.moveBtn);
        moveBtn.setOnClickListener(new OnClickListener(){
            public void onClick(View v) {
            	pHandler.filesOperation("move");
            }
        });     
        clearBtn = (Button)findViewById(R.id.clearBtn);
        clearBtn.setOnClickListener(new OnClickListener(){
            public void onClick(View v) {
            	pHandler.filesOperation("deleteAll");
            }
        });
        stimeBtn = (Button)findViewById(R.id.stimeBtn);
        stimeBtn.setOnClickListener(new OnClickListener(){
            public void onClick(View v) {
            	pHandler.clearTimeStamp();
            }
        });
 	   if (getIntent().getBooleanExtra("debug",false)){
 		   pHandler.initDebug((TextView)this.findViewById(R.id.timerText),(EditText)this.findViewById(R.id.debugText)); 
	   }else{
		   ((EditText)this.findViewById(R.id.debugText)).setVisibility(View.INVISIBLE);
	   }
 	   
 	   pHandler.setOnPreCacheCompletedListener(new PreCacheHandler.OnPreCacheCompletedListener(){
			public void OnPreCacheCompleted() {
				preCacheAd.this.runOnUiThread(new Runnable() {
				    public void run() {
				    	setButtonsEnabled(true);
				    }
				});
				pHandler.log("preCacheAd", "OnPreCacheCompleted");
			}
        });
 	   pHandler.setOnPreCacheFailedListener(new PreCacheHandler.OnPreCacheFailedListener(){
			public void OnPreCacheFailed(Exception exception) {
				pHandler.log("preCacheAd", "OnPreCacheFailed: " + exception.getMessage());
			}
       });
 	   //pHandler.setSIDs(sid);
 	  setButtonsEnabled(true);
    }
    private void setButtonsEnabled(boolean clickable) {
    	stopBtn.setEnabled(!clickable);
    	startBtn.setEnabled(clickable);
    	moveBtn.setEnabled(clickable);
  	   	stimeBtn.setEnabled(clickable);
  	   	clearBtn.setEnabled(clickable);
    }
}