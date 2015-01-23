package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import com.asynhkm.productchecker.Util.Tool;
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
        // socketIOInit();
        getSocketWorking();
    }

    @Override
    protected void onDestroy() {
      /*  if (socket != null)
            socket.disconnect();*/
        super.onDestroy();
    }

    private void socketIOInitOff() {

    }

    private void getSocketWorkingOff() {

    }

    //https://github.com/koush/AndroidAsync
    private void getSocketWorking() {
        SocketIOClient.connect(AsyncHttpClient.getDefaultInstance(), Config.domain, new ConnectCallback() {
            @Override
            public void onConnectCompleted(Exception ex, SocketIOClient client) {
                if (ex != null) {
                    ex.printStackTrace();

                    return;
                }


                client.setStringCallback(new StringCallback() {
                    @Override
                    public void onString(String string, Acknowledge acknowledge) {
                        System.out.println(string);
                    }
                });
                client.on("ordered", new EventCallback() {
                    @Override
                    public void onEvent(JSONArray argument, Acknowledge acknowledge) {
                        // System.out.println("args: " + argument.toString());
                        Tool.trace(getApplicationContext(), argument.toString());
                    }
                });
                client.setJSONCallback(new JSONCallback() {
                    @Override
                    public void onJSON(JSONObject json, Acknowledge acknowledge) {
                        //  System.out.println("args: " + json.toString());
                        Tool.trace(getApplicationContext(), json.toString());
                    }
                });




                client.emit("ordered");


            }
        });
    }


    private void socketIOInit() {

        try {
            IO.Options opts = new IO.Options();
            opts.forceNew = true;
            opts.reconnection = false;

            socket = IO.socket(Config.domain, opts);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

        socket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                Log.d("MainActivity: ", "socket connected");
                socket.emit("ordered", Config.current_order.getnumber());
                socket.disconnect();
            }
        }).on("ordered", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                JSONObject obj = (JSONObject) args[0];
                Log.d("MainActivity: ", "message back: " + obj.toString());
            }
        }).on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {

            }
        });

        socket.connect();
    }
}
