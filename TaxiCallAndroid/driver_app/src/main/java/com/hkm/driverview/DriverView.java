package com.hkm.driverview;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.graphics.Color;
import android.net.Uri;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;

import com.asynhkm.productchecker.Model.CallTask;
import com.asynhkm.productchecker.Model.GetTask;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.driverview.common.APIHelper;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.OrderListQ;
import com.hkm.driverview.common.PostD;
import com.hkm.driverview.ui.DialogTools;
import com.readystatesoftware.systembartint.SystemBarTintManager;

public class DriverView extends ActionBarActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dialog_collection = new DialogTools(this);
        setContentView(R.layout.act_main);
       /* SystemBarTintManager tintManager = new SystemBarTintManager(this);
        // enable status bar tint
        tintManager.setStatusBarTintEnabled(true);
        // enable navigation bar tint
        tintManager.setNavigationBarTintEnabled(true);

        // set a custom tint color for all system bars
        tintManager.setTintColor(Color.parseColor("#99000FF"));*/
// set a custom navigation bar resource
        //tintManager.setNavigationBarTintResource(R.drawable.my_tint);
// set a custom status bar drawable
        // tintManager.setStatusBarTintDrawable(MyDrawable);

    }

    private final String LOG_TAG = "MainActivity";
    private final String TAG = "DriverDaView";
    private final String API_URL = "https://api.twitter.com/1/statuses/user_timeline.json?count=1";
    private final String FILTER_NAME = this.getClass().getSimpleName();

    @Override
    protected void onResume() {
        super.onResume();
        LocalBroadcastManager.getInstance(this).registerReceiver(mMessageReceiver, new IntentFilter(FILTER_NAME));
        // testApiGet();
    }

    @Override
    protected void onPause() {
        super.onPause();
        LocalBroadcastManager.getInstance(this).unregisterReceiver(mMessageReceiver);
    }


    private BroadcastReceiver mMessageReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            String msg = intent.getStringExtra(APIHelper.EXTRA_MESSAGE);
            if (msg.equals(APIHelper.MSG_SUCCESS)) {
                Log.d(TAG, "! Success");
                Log.d(TAG, "@ APIHelper.sJsonResult = " + APIHelper.sJsonResult);
            } else if (msg.equals(APIHelper.MSG_NO_CONNECTIVITY)) {
                Log.d(TAG, "! No connectivity");
                Log.d(TAG, "@ APIHelper.sJsonResult = " + APIHelper.sJsonResult);
            } else if (msg.equals(APIHelper.MSG_HTTP_FAILURE)) {
                Log.d(TAG, "! HTTP failure");
                Log.d(TAG, "@ APIHelper.sJsonResult = " + APIHelper.sJsonResult);
            } else if (msg.equals(APIHelper.MSG_API_FAILURE)) {
                Log.d(TAG, "! API failure");
                Log.d(TAG, "@ APIHelper.sJsonResult = " + APIHelper.sJsonResult);
            } else if (msg.equals(APIHelper.MSG_JSON_FAILURE)) {
                Log.d(TAG, "! JSON failure");
                Log.d(TAG, "@ APIHelper.sJsonResult = " + APIHelper.sJsonResult);
            }
        }
    };

    private DialogTools dialog_collection;

    static class wrapper_inquiry_order {
        private String _call_id;

        public wrapper_inquiry_order(String id) {
            _call_id = id;
        }
    }


    public void inquiryOrder(final String number, final String cId) {
        final String Q = Config.domain + Config.control.inquiry;

        //consolidate
        final wrapper_inquiry_order cf = new wrapper_inquiry_order(cId);
        final GsonBuilder gsonb = new GsonBuilder();
        String request_body = "";
        Gson gson = gsonb.create();
        request_body = gson.toJson(cf);

        //task
        final PostD mCall = new PostD(DriverView.this, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                DriverView.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        final String numberstr = "tel:" + number;
                        Intent callIntent = new Intent(Intent.ACTION_CALL, Uri.parse(numberstr));
                        DriverView.this.startActivity(callIntent);

                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                DriverView.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                DriverView.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_start(R.string.wait);
                    }
                });
            }
        });

        mCall.setBody(request_body).setURL(Q).execute();

       /* getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mCall.setURL(Q).setBody("{}").execute();
            }
        });*/
    }
}
