package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.asynhkm.productchecker.Model.CallTask;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesClient;
import com.google.android.gms.common.api.GoogleApiClient;
import com.hkm.taxicallandroid.life.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.ViewBind.IncomingDriver;
import com.hkm.taxicallandroid.schema.CRChangeStatus;
import com.hkm.taxicallandroid.schema.Call;
import com.hkm.taxicallandroid.schema.ConfirmCall;
import com.parse.ParseAnalytics;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


/**
 * Created by hesk on 1/21/2015.
 */
public class CallPanel extends Activity implements
        GooglePlayServicesClient.ConnectionCallbacks, GoogleApiClient.OnConnectionFailedListener {
    private String rawjson;
    private TextView edtv, from, to;

    private static String TAG = "CallPanel Control";

    private DialogTools dT;
    private IncomingDriver viewbindDriverIncoming;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ParseAnalytics.trackAppOpenedInBackground(getIntent());

        setContentView(R.layout.orderconfirm);
        Bundle b = getIntent().getExtras();
        rawjson = b.getString("json_order");
        edtv = (TextView) findViewById(R.id._order_debug_line);
        from = (TextView) findViewById(R.id.from_spot);
        to = (TextView) findViewById(R.id.to_spot);

        Config.online_order = ConfirmCall.parse(rawjson);
        from.setText(Config.online_order.pickup);
        to.setText(Config.online_order.destination);

        if (_debug_mode) {
            edtv.setText(rawjson);
        } else {
            edtv.setVisibility(View.INVISIBLE);
        }
        dT = new DialogTools(this);

        viewbindDriverIncoming = new IncomingDriver();
        viewbindDriverIncoming.getView(this);

        //trigger with timer
        init_timer_task();
        //directly trigger the once
        //check_my_order();
    }

    private boolean _debug_mode = false;

    @Override
    public void onBackPressed() {
        viewbindDriverIncoming.cancel_by_customer();
    }

    @Override
    public void finish() {
        if (!exec.isShutdown()) exec.shutdown();
        super.finish();
    }

    @Override
    protected void onDestroy() {
      /*  if (socket != null)
            socket.disconnect();*/
        if (!exec.isShutdown()) exec.shutdown();
        super.onDestroy();
    }

    public void stream_up(final boolean sw) {
        if (!sw) exec.shutdown();
        else init_timer_task();
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
                dT.progress_bar_dismiss();
            }

            @Override
            public void beforeStart(final CallTask task) {
                dT.progress_bar_start(R.string.wait);
            }

        });

        mCall.setBody(cr.toJson()).setURL(Q).execute();

    }

    public DialogTools getDT() {
        return dT;
    }

    /**
     * timer session
     */
    private final ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
    private final Runnable maintask = new Runnable() {
        public void run() {
            CallPanel.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    Config.online_order.check_my_order(CallPanel.this, exec, viewbindDriverIncoming);
                }
            });
        }
    };

    private void init_timer_task() {
        exec.scheduleAtFixedRate(maintask, 1000, Config._default.setlooptimer, TimeUnit.MILLISECONDS);
    }

    @Override
    public void onConnected(Bundle bundle) {

    }

    @Override
    public void onDisconnected() {

    }

    @Override
    public void onConnectionFailed(ConnectionResult connectionResult) {

    }
}
