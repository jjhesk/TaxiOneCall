package com.hkm.taxicallandroid.ViewBind;

import android.app.Activity;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.R;
import com.hkm.taxicallandroid.WaitingForRide;
import com.hkm.taxicallandroid.schema.check_order_obj;

/**
 * Created by hesk on 1/25/2015.
 */
public class IncomingDriver {
    private TextView
            taxiname, licenseno, timeest;
    private View controlpanel;

    private ImageView confirm, nosure;

    private WaitingForRide __ctx;
    public IncomingDriver() {
    }

    public void getView(Activity _ctx) {
        controlpanel = (View) _ctx.findViewById(R.id.panel_session);
        taxiname = (TextView) _ctx.findViewById(R.id.taxi_name);
        licenseno = (TextView) _ctx.findViewById(R.id.license_no);
        timeest = (TextView) _ctx.findViewById(R.id.time_est);
        controlpanel.setVisibility(View.INVISIBLE);

        __ctx = (WaitingForRide)_ctx;
        confirm = (ImageView) _ctx.findViewById(R.id.confirm_ordered);
        nosure = (ImageView) _ctx.findViewById(R.id.wait);
        confirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                __ctx.confirm_order();
            }
        });
        nosure.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                __ctx.reject_order();
            }
        });
    }

    public void incoming(final check_order_obj incoming) {
        controlpanel.setVisibility(View.VISIBLE);
        taxiname.setText(incoming.getDriverName());
        licenseno.setText(incoming.getLicense());
        timeest.setText(incoming.getEstTime());
    }
}
