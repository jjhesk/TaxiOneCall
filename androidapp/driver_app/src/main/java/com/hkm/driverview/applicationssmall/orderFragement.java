package com.hkm.driverview.applicationssmall;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.animation.BounceInterpolator;
import android.widget.ImageButton;
import android.widget.TextView;

import com.daimajia.swipe.SwipeLayout;
import com.hkm.driverview.R;
import com.hkm.driverview.life.Config;
import com.hkm.driverview.common.schema.DealFace;
import com.hkm.driverview.singleorder.DriverControl;

import java.text.ParseException;

/**
 * Created by hesk on 1/25/2015.
 */
public class orderFragement extends Fragment {
    public orderFragement() {
        super();
    }

    private DriverControl mdrivercontrol;
    private Context _ctx;
    private boolean returnfailure = false;
    private static String TAG = "order view";

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_orderview, container, false);
    }

    private TextView tvfrom, tvto, order_place_time, remarks, timer;
    private SwipeLayout infopanel;
    private ImageButton drive_map;

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        timer = (TextView) view.findViewById(R.id.timer);
        tvfrom = (TextView) view.findViewById(R.id.order_from);
        tvto = (TextView) view.findViewById(R.id.order_to);
        order_place_time = (TextView) view.findViewById(R.id.time);
        remarks = (TextView) view.findViewById(R.id.remarks);
        drive_map = (ImageButton) view.findViewById(R.id.driver_map);
        tvto.setSelected(true);
        tvfrom.setSelected(true);
        tvfrom.setText(Config.current_view_order.getPickUp());
        tvto.setText(Config.current_view_order.getDestination());
        remarks.setText(Config.current_view_order.getRemark());
        infopanel = (SwipeLayout) view.findViewById(R.id.swipe_info_panel);
        infopanel.setSwipeEnabled(false);
        try {
            order_place_time.setText(Config.current_view_order.getMoment());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        drive_map.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mdrivercontrol.swipeMapToggle();
              /*  YoYo.with(Techniques.Swing).duration(700).playOn(v);*/
             /*   new RotationAnimation(v).setPivot(RotationAnimation.PIVOT_CENTER)
                        .setDuration(1000)
                        .setInterpolator(new BounceInterpolator())
                        .animate();*/
                v.animate().rotationBy(270f).setInterpolator(new BounceInterpolator());
            }
        });
    }

    public void setDealReportTime(final DealFace dealset) {
        timer.setText(dealset.getReportedTime());
        infopanel.setSwipeEnabled(true);
        infopanel.open(true);
    }


    public void setDriverControl(final DriverControl dc) {
        mdrivercontrol = dc;
    }


}
