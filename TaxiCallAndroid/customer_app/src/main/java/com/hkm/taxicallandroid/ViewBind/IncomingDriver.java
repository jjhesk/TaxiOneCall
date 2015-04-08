package com.hkm.taxicallandroid.ViewBind;

import android.app.Activity;
import android.content.Context;
import android.os.Handler;
import android.os.Vibrator;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.hkm.taxicallandroid.CallPanel;
import com.hkm.taxicallandroid.R;
import com.hkm.taxicallandroid.life.Config;
import com.hkm.taxicallandroid.schema.Order_status;
import com.hkm.taxicallandroid.schema.Report;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by hesk on 1/25/2015.
 */
public class IncomingDriver {
    private TextView status_ln, taxiname, licenseno, timeest, count_down;
    private View controlpanel;

    private ImageView confirm, nosure;

    private CallPanel __ctx;
    private boolean hasDriver = false;
    private Order_status current_status;

    public IncomingDriver() {
    }

    public final static int WAITING_DRIVER = 0;
    public final static int DRIVER_TOOK_THE_ORDER = 1;
    public final static int DRIVER_PROMPT_CUSTOMER = 2;
    public final static int CUSTOME_ACCEPTED_PROMPT = 3;

    public void getView(Activity _ctx) {
        controlpanel = (View) _ctx.findViewById(R.id.panel_session);
        taxiname = (TextView) _ctx.findViewById(R.id.taxi_name);
        licenseno = (TextView) _ctx.findViewById(R.id.license_no);
        timeest = (TextView) _ctx.findViewById(R.id.time_est);
        status_ln = (TextView) _ctx.findViewById(R.id.status_ln);
        count_down = (TextView) _ctx.findViewById(R.id.count_down);
        controlpanel.setVisibility(View.INVISIBLE);

        __ctx = (CallPanel) _ctx;
        confirm = (ImageView) _ctx.findViewById(R.id.confirm_ordered);
        nosure = (ImageView) _ctx.findViewById(R.id.wait);
        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                confirm_order();
            }
        });
        nosure.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                switch (current_status.replied()) {
                    case DRIVER_TOOK_THE_ORDER:
                        cancel_by_customer();
                        break;
                    case DRIVER_PROMPT_CUSTOMER:
                        reject_order();
                        break;
                    case WAITING_DRIVER:

                        break;
                }
            }
        });
        left_time = 60;
        init_timer_task();
    }

    private final Handler runner = new Handler();
    private static final ScheduledExecutorService sexservice = Executors.newSingleThreadScheduledExecutor();
    private final Runnable maintask = new Runnable() {
        public void run() {
            __ctx.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (left_time == 0) {
                        if (current_status.replied() == WAITING_DRIVER && sexservice != null) {
                            sexservice.shutdown();
                            __ctx.getDT().give_up_prompt();
                        }
                    } else {
                        left_time--;
                        count_down.setText(left_time + " seconds left");
                    }
                }
            });
        }
    };


    private static int left_time = 60;

    private void init_timer_task() {
        sexservice.scheduleAtFixedRate(maintask, 1000, Config._default.timer, TimeUnit.MILLISECONDS);
    }

    public void confirm_order() {
        Config.online_order.taken(__ctx, __ctx.getDT());
        __ctx.stream_up(false);
    }

    public void reject_order() {
        Config.c_report = new Report(Config.online_order._id);
        __ctx.getDT().reject_call(this);
    }

    public void cancel_by_customer() {
        __ctx.change_call_status("removed_c");
    }


    public void incoming(final Order_status incoming) {
        current_status = incoming;
        switch (incoming.replied()) {
            case DRIVER_TOOK_THE_ORDER:
                controlpanel.setVisibility(View.VISIBLE);
                confirm.setVisibility(View.INVISIBLE);
                taxiname.setText(incoming.getDriverName());
                licenseno.setText(incoming.getLicense());
                final String timeEst = incoming.getEstTime();
                timeest.setText(timeEst);

                status_ln.setText(__ctx.getResources().getString(R.string.status_new_taxi));
                hasDriver = true;

                int k = Integer.parseInt(timeEst);
                left_time = k * 60 + left_time;
                sexservice.shutdown();
                break;

            case DRIVER_PROMPT_CUSTOMER:
                if (hasDriver) {
                    confirm.setVisibility(View.VISIBLE);
                    status_ln.setText(__ctx.getResources().getString(R.string.status_complete_prompt));
                    Vibrator v = (Vibrator) __ctx.getSystemService(Context.VIBRATOR_SERVICE);
                    // Vibrate for 500 milliseconds
                    v.vibrate(Config._default.vibe_length);
                    //maybe adding more design to show up the taxi person images in here too.
                }
                break;
            case WAITING_DRIVER:
                if (hasDriver) {
                    hasDriver = false;
                    // trigger the driver left the order from the customer
                    status_ln.setText(__ctx.getResources().getString(R.string.status_taxi_withdrawn));
                    controlpanel.setVisibility(View.INVISIBLE);
                    left_time = 60;
                    init_timer_task();
                }

                break;
        }
    }
}
