package com.hkm.driverview;

import android.content.Context;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ListView;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.util.ArrayList;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

public class DriverView extends ActionBarActivity {

    ListView list;

    String[] namesArr;


    ArrayList<String> mylist = new ArrayList<String>();

    private Socket mSocket;

    private Context _ctx;

    private Socket newSocket() {
        try {
            mSocket = IO.socket(Config.domain);
        } catch (URISyntaxException e) {

        }

        return mSocket;
    }

    Emitter.Listener onNewMessage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_driver_view);
        _ctx = getApplicationContext();
        // helper = new databasehelper(this);

        list = (ListView) findViewById(R.id.newslist);


        onNewMessage = new Emitter.Listener() {
            @Override
            public void call(final Object... args) {
                DriverView.this.getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        JSONObject data = (JSONObject) args[0];
                        String username;
                        String message;
                        try {
                            username = data.getString("username");
                            message = data.getString("message");
                        } catch (JSONException e) {
                            return;
                        }

                        // add the message to view
                        addMessage(username, message);
                    }
                });
            }

        };

        try {
            mSocket = IO.socket(Config.domain);
            mSocket.connect();
            mSocket.emit("ordered", 29299291);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }


        display(mylist);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        mSocket.disconnect();
        mSocket.off("ordered", onNewMessage);
    }


    private void display(ArrayList<String> mylist) {
        // TODO Auto-generated method stub
        final ArrayAdapter<String> aa = new ArrayAdapter<String>(getApplicationContext(), android.R.layout.simple_list_item_1, mylist);
        Log.d("real Arraylist", "" + mylist);
        //Log.d("array adapter",aa.toString());
        // list.setAdapter(aa);
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                list.setAdapter(aa);
            }
        });

    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main_driver_view, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();

        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

}
