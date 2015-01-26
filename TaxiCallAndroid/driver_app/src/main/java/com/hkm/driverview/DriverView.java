package com.hkm.driverview;

import android.app.Fragment;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.support.v4.content.LocalBroadcastManager;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;

import com.asynhkm.productchecker.Model.CallTask;
import com.hkm.driverview.ListOrderes.FragmentX;
import com.hkm.driverview.ListOrderes.OrderCustomer;
import com.hkm.driverview.common.APIHelper;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.common.PostD;
import com.hkm.driverview.schema.simpleId;
import com.hkm.driverview.singleorder.OrderView;
import com.hkm.driverview.ui.DialogTools;

public class DriverView extends ActionBarActivity {
    private final String LOG_TAG = "MainActivity";
    private final String TAG = "DriverDaView";
    private final String FILTER_NAME = this.getClass().getSimpleName();

    private Identity idcard;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dialog_collection = new DialogTools(this);
        idcard = new Identity(this);
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

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == Config.INTENT_CODE_LOGIN || requestCode == Config.INTENT_CODE_SINGLE_ORDER) {
            // if (resultCode == RESULT_OK) {
            // A contact was picked.  Here we will just display it
            // to the user.
            // startActivity(new Intent(Intent.ACTION_VIEW, data));
            fragmentx.runagain();
            //}
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private FragmentX fragmentx;

    @Override
    public void onAttachFragment(Fragment fragment) {
        // TODO Auto-generated method stub
        super.onAttachFragment(fragment);
        //  Tool.trace(this, fragment.getClass().getName());
        if (fragment.getClass().getName().equalsIgnoreCase("com.hkm.driverview.ListOrderes.FragmentX")) {
            fragmentx = (FragmentX) fragment;
        }
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

    public void inquiryOrder(final String number, final String cId, final OrderCustomer order) {
        final String Q = Config.domain + Config.control.inquiry;
        //consolidate
        Config.current_view_order = order;
        final simpleId cf = new simpleId(cId, idcard.getNumbr());

        //task
        final PostD mCall = new PostD(DriverView.this, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                DriverView.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        fragmentx.stopLoopRequest();
                        Intent orderintent = new Intent(DriverView.this, OrderView.class);
                        startActivityForResult(orderintent, Config.INTENT_CODE_SINGLE_ORDER);
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
                        dialog_collection.showSimpleMessage(msg);
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

        mCall.setBody(cf.toJson()).setURL(Q).execute();

       /* getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mCall.setURL(Q).setBody("{}").execute();
            }
        });*/
    }
}
