package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.daimajia.swipe.SwipeLayout;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.taxicallandroid.CommonPack.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.schema.ConfirmCall;
import com.hkm.taxicallandroid.schema.DataCallOrder;

import org.json.JSONObject;

import java.net.URISyntaxException;


/**
 * Created by hesk on 1/21/2015.
 */
public class WaitingForRide extends Activity {
    private String rawjson;
    private TextView edtv, from, to;
    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.orderconfirm);
        Bundle b = getIntent().getExtras();
        rawjson = b.getString("json_order");
        edtv = (TextView) findViewById(R.id.confirm_order_view);
        from = (TextView) findViewById(R.id.from_spot);
        to = (TextView) findViewById(R.id.to_spot);
        GsonBuilder gb = new GsonBuilder();
        Gson gs = gb.create();
        ConfirmCall CCdata = gs.fromJson(rawjson, ConfirmCall.class);
        edtv.setText(rawjson);
        from.setText(CCdata.pickup);
        to.setText(CCdata.destination);
        socketIOInit();
    }

    @Override
    protected void onDestroy() {
        if (socket != null)
            socket.disconnect();
        super.onDestroy();
    }

    private void socketIOInit() {
        try {
            socket = IO.socket(Config.domain);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        socket
                .on(Socket.EVENT_CONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                Log.d("MainActivity: ", "socket connected");
                socket.emit("ordered", Config.current_order.getnumber());
                socket.disconnect();
            }
        })
                .on("ordered", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                JSONObject obj = (JSONObject) args[0];
                Log.d("MainActivity: ", "message back: " + obj.toString());
            }
        })
                .on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {

            }
        });
        socket.connect();
    }
}
