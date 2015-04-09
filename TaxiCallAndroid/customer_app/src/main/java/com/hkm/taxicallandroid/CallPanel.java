package com.hkm.taxicallandroid;

import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.hkm.taxicallandroid.CommonPack.callpanelmechanism;
import com.hkm.taxicallandroid.life.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.ViewBind.IncomingDriver;
import com.hkm.taxicallandroid.schema.ConfirmCall;
import com.hkm.taxicallandroid.schema.Report;
import com.parse.ParseAnalytics;


/**
 * Created by hesk on 1/21/2015.
 */
public class CallPanel extends callpanelmechanism {
    private String rawjson;
    private TextView edtv, from, to;
    private IncomingDriver viewbindDriverIncoming;
    private DialogTools dT;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ParseAnalytics.trackAppOpenedInBackground(getIntent());
        setContentView(R.layout.orderconfirm);


        edtv = (TextView) findViewById(R.id._order_debug_line);
        from = (TextView) findViewById(R.id.from_spot);
        to = (TextView) findViewById(R.id.to_spot);

        Bundle b = getIntent().getExtras();
        rawjson = b.getString("json_order");
        Config.online_order = ConfirmCall.parse(rawjson);
        Config.c_report = new Report(Config.online_order._id);
        viewbindDriverIncoming = new IncomingDriver(new IncomingDriver.updateEstTimer() {
            @Override
            public void update(int time) {
                addLeftTime(time * 60);
            }

            @Override
            public void onDriverWait() {
                init_timer_task();
            }
        });
        dT = new DialogTools(this);
        viewbindDriverIncoming.getView(this, dT);


        from.setText(Config.online_order.pickup);
        to.setText(Config.online_order.destination);

        if (_debug_mode) {
            edtv.setText(rawjson);
        } else {
            edtv.setVisibility(View.INVISIBLE);
        }


        init_timer_task();

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

    @Override
    protected DialogTools getDT() {
        return dT;
    }


    @Override
    protected IncomingDriver getIncomingDriverTask() {
        return viewbindDriverIncoming;
    }
}
