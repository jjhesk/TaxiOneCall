package com.hkm.taxicallandroid.CommonPack;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;

import com.asynhkm.productchecker.Model.CallTask;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesClient;
import com.google.android.gms.common.api.GoogleApiClient;
import com.hkm.taxicallandroid.R;
import com.hkm.taxicallandroid.ViewBind.IncomingDriver;
import com.hkm.taxicallandroid.life.Config;
import com.hkm.taxicallandroid.schema.CRChangeStatus;
import com.hkm.taxicallandroid.schema.Call;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by hesk on 4/10/2015.
 */
abstract public class callpanelmechanism extends Activity implements
        GooglePlayServicesClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener {

    abstract protected IncomingDriver getIncomingDriverTask();

    abstract protected DialogTools getDT();

    private int left_time;

    private static String TAG = "CallPanel Control";

    private IncomingDriver viewbindDriverIncoming;

    @Override
    public void onConnected(Bundle bundle) {

    }

    @Override
    public void onDisconnected() {

    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {

    }


    /**
     * timer session
     */
    protected final ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
    private Handler hh = new Handler();
    private Handler hb = new Handler();
    protected final Runnable maintask = new Runnable() {
        public void run() {
            hh.post(new Runnable() {
                @Override
                public void run() {
                    if (!exec.isShutdown()) {
                        if (left_time == 0) {
                            if (Config.online_order.getStatusNow().replied() == IncomingDriver.WAITING_DRIVER) {
                                exec.shutdown();
                                getDT().give_up_prompt();
                            }
                        } else {

                            hb.post(new Runnable() {
                                @Override
                                public void run() {
                                    Config.online_order.check_my_order(getApplicationContext(), getIncomingDriverTask(), exec);
                                }
                            });


                            left_time--;
                            getIncomingDriverTask().getNumberView().setText(left_time + " seconds left");


                        }
                    }
                }
            });
        }
    };


    protected void init_timer_task() {
        left_time = Config._default.waiting_drive_time_sec;
        exec.scheduleAtFixedRate(maintask, 1000, Config._default.timer, TimeUnit.MILLISECONDS);
    }

    protected void setLeftTime(int m) {
        left_time = m;
    }

    protected void addLeftTime(int m) {
        left_time += m;
    }

    public void change_call_status(final String status_name) {
        final CRChangeStatus cr = new CRChangeStatus(Config.online_order._id, status_name);
        final String Q = Config.domain + Config.control.call_record_status;
        //task
        final Call mCall = new Call(this, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                // __ctx.runOnUiThread(success_call);
                finish();
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                getDT().progress_bar_dismiss();
            }

            @Override
            public void beforeStart(final CallTask task) {
                getDT().progress_bar_start(R.string.wait);
            }

        });

        mCall.setBody(cr.toJson()).setURL(Q).execute();

    }
}
