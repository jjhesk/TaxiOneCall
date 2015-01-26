package com.hkm.driverview.singleorder;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.TextView;

import com.afollestad.materialdialogs.MaterialDialog;
import com.asynhkm.productchecker.Model.CallTask;
import com.hkm.driverview.ListOrderes.OrderAdapter;
import com.hkm.driverview.ListOrderes.OrderCustomer;
import com.hkm.driverview.R;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.common.PostD;
import com.hkm.driverview.schema.DealFace;
import com.hkm.driverview.schema.simpleId;
import com.hkm.driverview.ui.DialogTools;

import java.text.ParseException;

/**
 * Created by hesk on 1/25/2015.
 */
public class orderFragement extends Fragment {
    public orderFragement() {
        super();
    }

    private Context _ctx;
    private boolean returnfailure = false;
    private static String TAG = "order view";
    private DialogTools dialog_collection;
    private OrderAdapter mAdapter;
    private Identity logininfo;
    private OrderCustomer customer_order;
    private static DealFace dealSet;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        logininfo = new Identity(activity);
        dialog_collection = new DialogTools(activity);
        dealSet = new DealFace();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_orderview, container, false);
    }

    private ImageButton callcustomer, pickup, start, release;
    private TextView tvfrom, tvto, order_place_time, remarks;

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        callcustomer = (ImageButton) view.findViewById(R.id.call_customer);
        pickup = (ImageButton) view.findViewById(R.id.pick_up);
        start = (ImageButton) view.findViewById(R.id.start_taxi_now);
        release = (ImageButton) view.findViewById(R.id.release_order);
        tvfrom = (TextView) view.findViewById(R.id.order_from);
        tvto = (TextView) view.findViewById(R.id.order_to);
        order_place_time = (TextView) view.findViewById(R.id.time);
        remarks = (TextView) view.findViewById(R.id.remarks);

        callcustomer.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CallCustomer();
            }
        });
        release.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog_collection.writeNote(
                        new MaterialDialog.ListCallback() {
                            @Override
                            public void onSelection(MaterialDialog materialDialog, View view, int i, CharSequence charSequence) {
                                switch (i) {
                                    case 0:
                                        CallRemove();
                                        break;
                                    case 1:
                                        CallRelease();
                                        break;
                                }
                            }
                        });
            }
        });
        pickup.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialog_collection.deal(
                        new MaterialDialog.ListCallback() {
                            @Override
                            public void onSelection(MaterialDialog materialDialog, View view, int i, CharSequence charSequence) {
                                dealSet.setDeal(
                                        Config.current_view_order.getOrderId(),
                                        logininfo.getNumbr(),
                                        charSequence.toString()
                                );
                                CallsetDeal();
                            }
                        });
            }
        });
        tvfrom.setText(Config.current_view_order.getPickUp());
        tvto.setText(Config.current_view_order.getDestination());
        remarks.setText(Config.current_view_order.getRemark());
        try {
            order_place_time.setText(Config.current_view_order.getMoment());
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    private void CallsetDeal() {
        final String Q = Config.domain + Config.control.setdeal;

        //task
        final PostD mCall = new PostD(getActivity(), new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                         /*   Intent orderintent = new Intent(getActivity(), OrderView.class);
                        startActivity(orderintent);*/
                        // getActivity().finish();
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_start(R.string.wait);
                    }
                });
            }
        });

        mCall.setBody(dealSet.toJson()).setURL(Q).execute();
    }

    private void CallRemove() {
        final String Q = Config.domain + Config.control.remove;

        //consolidate
        final simpleId cf = new simpleId(Config.current_view_order.getOrderId(), logininfo.getNumbr());

        //task
        final PostD mCall = new PostD(getActivity(), new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                         /*   Intent orderintent = new Intent(getActivity(), OrderView.class);
                        startActivity(orderintent);*/
                        getActivity().finish();
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_start(R.string.wait);
                    }
                });
            }
        });

        mCall.setBody(cf.toJson()).setURL(Q).execute();
    }


    private void CallRelease() {
        final String Q = Config.domain + Config.control.release;

        //consolidate
        final simpleId cf = new simpleId(Config.current_view_order.getOrderId(), logininfo.getNumbr());


        //task
        final PostD mCall = new PostD(getActivity(), new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                         /*   Intent orderintent = new Intent(getActivity(), OrderView.class);
                        startActivity(orderintent);*/
                        getActivity().finish();
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_start(R.string.wait);
                    }
                });
            }
        });

        mCall.setBody(cf.toJson()).setURL(Q).execute();
    }

    private void CallCustomer() {
        final String numberstr = "tel:" + Config.current_view_order.getCallnumber();
        Intent callIntent = new Intent(Intent.ACTION_CALL, Uri.parse(numberstr));
        getActivity().startActivity(callIntent);
    }
}
