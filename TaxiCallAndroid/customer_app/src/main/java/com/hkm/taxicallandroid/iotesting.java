package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

import com.asynhkm.productchecker.Util.Tool;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.taxicallandroid.CommonPack.Config;
import com.hkm.taxicallandroid.schema.ConfirmCall;
import com.koushikdutta.async.http.AsyncHttpClient;
import com.koushikdutta.async.http.socketio.Acknowledge;
import com.koushikdutta.async.http.socketio.ConnectCallback;
import com.koushikdutta.async.http.socketio.EventCallback;
import com.koushikdutta.async.http.socketio.JSONCallback;
import com.koushikdutta.async.http.socketio.SocketIOClient;
import com.koushikdutta.async.http.socketio.StringCallback;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * Created by hesk on 1/23/2015.
 */
public class iotesting extends Activity {

    private String rawjson;
    private TextView edtv, from, to;
    private Socket socket;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.orderconfirm);

        edtv = (TextView) findViewById(R.id._order_debug_line);
        from = (TextView) findViewById(R.id.from_spot);
        to = (TextView) findViewById(R.id.to_spot);
        //  GsonBuilder gb = new GsonBuilder();
        //  Gson gs = gb.create();
        // ConfirmCall CCdata = gs.fromJson(rawjson, ConfirmCall.class);
        //  edtv.setText(rawjson);
        //  from.setText(CCdata.pickup);
        //   to.setText(CCdata.destination);
        // socketIOInit();
        getSocketWorking();
    }

    SocketIOClient clientio;


    @Override
    protected void onDestroy() {
        // if (clientio != null)
        //     clientio.disconnect();
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

                clientio = client;


                client.setStringCallback(new StringCallback() {
                    @Override
                    public void onString(String string, Acknowledge acknowledge) {
                        System.out.println(string);
                    }
                });
                //    Tool.trace(getApplicationContext(), "success connected");

                client.on("ordered", new EventCallback() {
                    @Override
                    public void onEvent(JSONArray argument, Acknowledge acknowledge) {
                        System.out.println("args: " + argument.toString());
                        //  Tool.trace(getApplicationContext(), argument.toString());
                    }
                });
                client.setJSONCallback(new JSONCallback() {
                    @Override
                    public void onJSON(JSONObject json, Acknowledge acknowledge) {
                        System.out.println("args: " + json.toString());
                        //  Tool.trace(getApplicationContext(), json.toString());
                    }
                });
                // client.emit("ordered");
            }
        });
    }

}
