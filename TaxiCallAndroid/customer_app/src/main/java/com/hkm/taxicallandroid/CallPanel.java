package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;

import com.hkm.taxicallandroid.CommonPack.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.ViewBind.IncomingDriver;
import com.hkm.taxicallandroid.schema.ConfirmCall;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


/**
 * Created by hesk on 1/21/2015.
 */
public class CallPanel extends Activity {
    private String rawjson;
    private TextView edtv, from, to;


    private ConfirmCall CCdata;
    private DialogTools dT;
    private IncomingDriver viewbindDriverIncoming;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.orderconfirm);
        Bundle b = getIntent().getExtras();
        rawjson = b.getString("json_order");
        edtv = (TextView) findViewById(R.id._order_debug_line);
        from = (TextView) findViewById(R.id.from_spot);
        to = (TextView) findViewById(R.id.to_spot);

        CCdata = ConfirmCall.parse(rawjson);
        from.setText(CCdata.pickup);
        to.setText(CCdata.destination);

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

    public ConfirmCall getCallRecord() {
        return CCdata;
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
                    // dialog_collection.showSimpleMessage("testing now");
                    CCdata.check_my_order(CallPanel.this, exec, viewbindDriverIncoming);
                }
            });
        }
    };

    private void init_timer_task() {
        exec.scheduleAtFixedRate(maintask, 1000, Config._default.setlooptimer, TimeUnit.MILLISECONDS);
    }
}
