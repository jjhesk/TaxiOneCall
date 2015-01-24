package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.asynhkm.productchecker.Model.CallTask;
import com.asynhkm.productchecker.Util.Tool;
import com.daimajia.swipe.SwipeLayout;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.taxicallandroid.CommonPack.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.schema.Call;
import com.hkm.taxicallandroid.schema.ConfirmCall;
import com.hkm.taxicallandroid.schema.DataCallOrder;
import com.koushikdutta.async.http.AsyncHttpClient;
import com.koushikdutta.async.http.socketio.Acknowledge;
import com.koushikdutta.async.http.socketio.ConnectCallback;
import com.koushikdutta.async.http.socketio.EventCallback;
import com.koushikdutta.async.http.socketio.JSONCallback;
import com.koushikdutta.async.http.socketio.SocketIOClient;
import com.koushikdutta.async.http.socketio.StringCallback;

import org.json.JSONArray;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


/**
 * Created by hesk on 1/21/2015.
 */
public class WaitingForRide extends Activity {
    private String rawjson;
    private TextView edtv, from, to;
    private Socket socket;
    private ImageView confirm, nosure;
    private ConfirmCall CCdata;
    private DialogTools dT;
    private View controlpanel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.orderconfirm);
        Bundle b = getIntent().getExtras();
        rawjson = b.getString("json_order");
        edtv = (TextView) findViewById(R.id._order_debug_line);
        from = (TextView) findViewById(R.id.from_spot);
        to = (TextView) findViewById(R.id.to_spot);
        confirm = (ImageView) findViewById(R.id.confirm_ordered);
        nosure = (ImageView) findViewById(R.id.wait);
        GsonBuilder gb = new GsonBuilder();
        Gson gs = gb.create();
        CCdata = gs.fromJson(rawjson, ConfirmCall.class);

        from.setText(CCdata.pickup);
        to.setText(CCdata.destination);
        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                confirm_order();
            }
        });
        nosure.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                reject_order();
            }
        });
        if (_debug_mode) {
            edtv.setText(rawjson);
        } else {
            edtv.setVisibility(View.INVISIBLE);
        }
        dT = new DialogTools(this);


        controlpanel = (View) findViewById(R.id.panel_session);
        controlpanel.setVisibility(View.INVISIBLE);
        //trigger with timer
        init_timer_task();
        //directly trigger the once
        //check_my_order();
    }

    private boolean _debug_mode = false;

    @Override
    protected void onDestroy() {
      /*  if (socket != null)
            socket.disconnect();*/
        super.onDestroy();
    }

    private void confirm_order() {
        CCdata.taken(this, dT);
    }

    private void reject_order() {

    }



    /**
     * timer session
     */
    private final ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
    private final Runnable maintask = new Runnable() {
        public void run() {
            WaitingForRide.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    // dialog_collection.showSimpleMessage("testing now");
                    CCdata.check_my_order(WaitingForRide.this, exec, controlpanel);
                }
            });
        }
    };

    private void init_timer_task() {
        exec.scheduleAtFixedRate(maintask, 1000, Config._default.setlooptimer, TimeUnit.MILLISECONDS);
    }
}
