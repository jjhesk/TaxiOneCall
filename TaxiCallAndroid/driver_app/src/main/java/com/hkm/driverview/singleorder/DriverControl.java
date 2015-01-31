package com.hkm.driverview.singleorder;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.view.View;
import android.widget.ImageButton;

import com.afollestad.materialdialogs.MaterialDialog;
import com.asynhkm.productchecker.Model.CallTask;
import com.asynhkm.productchecker.Util.Tool;
import com.daimajia.swipe.SwipeLayout;
import com.hkm.driverview.R;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.common.flux.PostD;
import com.hkm.driverview.common.schema.CallRecordStatusChange;
import com.hkm.driverview.common.schema.DealFace;
import com.hkm.driverview.common.schema.simpleId;
import com.hkm.driverview.ui.DialogTools;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

/**
 * Created by hesk on 1/29/2015.
 */
public class DriverControl {
    private ImageButton callcustomer, report_time_est, start, release;
    private DialogTools dialog_collection;
    private DealFace dealSet;
    private OrderView _ctx;
    private Identity logininfo;
    private static String TAG = "Driver Control";
    private orderFragement order_f;
    private SwipeLayout map_panel_swipe;

    public DriverControl(DialogTools drt, DealFace df, Identity id, orderFragement orderf) {
        this.dialog_collection = drt;
        this.logininfo = id;
        this.dealSet = df;
        this.order_f = orderf;
    }

    public void initView(OrderView ctxx) {
        _ctx = ctxx;
        callcustomer = (ImageButton) _ctx.findViewById(R.id.call_customer);
        report_time_est = (ImageButton) _ctx.findViewById(R.id.report_time_est);
        start = (ImageButton) _ctx.findViewById(R.id.start_taxi_now);
        release = (ImageButton) _ctx.findViewById(R.id.release_order);
        map_panel_swipe = (SwipeLayout) _ctx.findViewById(R.id.control_panel_driver);
        // map_panel_swipe.setDragEdge(SwipeLayout.DragEdge.Top);
        // map_panel_swipe.setShowMode(SwipeLayout.ShowMode.PullOut);

        //timer
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
                                        // CallRemove();
                                        break;
                                    case 1:
                                        CallPrompt(new CallRecordStatusChange(Config.current_view_order.getOrderId(), logininfo.getNumbr(), "public"),
                                                new Runnable() {
                                                    @Override
                                                    public void run() {
                                                        _ctx.finish();
                                                        dialog_collection.progress_bar_dismiss();
                                                    }
                                                });
                                        break;
                                }
                            }
                        });
            }
        });
        report_time_est.setOnClickListener(new View.OnClickListener() {
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
                                //report the time
                            }
                        });
            }
        });
        start.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                CallPrompt(new CallRecordStatusChange(Config.current_view_order.getOrderId(), logininfo.getNumbr(), "stage2"),
                        new Runnable() {
                            @Override
                            public void run() {
                                dialog_collection.progress_bar_dismiss();
                                start_customer_prompt();
                                dialog_collection.progress_bar_start(R.string.waiting_customer_res_prompt);
                            }
                        });
            }
        });
    }

    public void swipeMapToggle() {
        map_panel_swipe.toggle();
    }

    private ScheduledExecutorService exeservice = Executors.newSingleThreadScheduledExecutor();

    private void start_customer_prompt() {
        exeservice.scheduleAtFixedRate(prompt_customer_task, 1000, Config._default.refresh_time_customer_prompt, TimeUnit.MILLISECONDS);
    }

    private final Runnable prompt_customer_task = new Runnable() {
        public void run() {
            _ctx.runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    CheckCallStatus();
                }
            });
        }
    };


    private void CallCustomer() {
        final String numberstr = "tel:" + Config.current_view_order.getCallnumber();
        Intent callIntent = new Intent(Intent.ACTION_CALL, Uri.parse(numberstr));
        _ctx.startActivity(callIntent);
    }


    private void CheckCallStatus() {
        final String Q = Config.domain + Config.control.prompt_customer;
        //task
        final PostD mCall = new PostD(_ctx, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                // _ctx.runOnUiThread(success_call);
                int ans = Integer.parseInt(data);
                if (ans == 1) {
                    dialog_collection.progress_bar_dismiss();
                    exeservice.shutdown();
                    dialog_collection.showSimpleMessage(R.string.action_done_passenger, new MaterialDialog.Callback() {
                        @Override
                        public void onNegative(MaterialDialog materialDialog) {

                        }

                        @Override
                        public void onPositive(MaterialDialog materialDialog) {
                            _ctx.finish();
                        }
                    });

                    Tool.trace(_ctx, R.string.action_done_passenger);
                } else if (ans == 2) {
                    dialog_collection.progress_bar_dismiss();
                    exeservice.shutdown();
                    dialog_collection.showSimpleMesssageAlert(R.string.action_customer_reject_final, new MaterialDialog.Callback() {
                        @Override
                        public void onNegative(MaterialDialog materialDialog) {

                        }

                        @Override
                        public void onPositive(MaterialDialog materialDialog) {
                            _ctx.finish();
                        }
                    });

                    Tool.trace(_ctx, R.string.action_done_passenger);
                }
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                        dialog_collection.showSimpleMessage(msg);
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                    }
                });
            }
        });
        final simpleId cf = new simpleId(Config.current_view_order.getOrderId(), logininfo.getNumbr());
        mCall.setBody(cf.toJson()).setURL(Q).execute();
    }

    private void CallsetDeal() {
        final String Q = Config.domain + Config.control.setdeal;
        //task
        final PostD mCall = new PostD(_ctx, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                        order_f.setDealReportTime(dealSet);
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_start(R.string.wait);
                    }
                });
            }
        });

        mCall.setBody(dealSet.toJson()).setURL(Q).execute();
    }

    private void CallPrompt(final CallRecordStatusChange cf, final Runnable success_call) {
        final String Q = Config.domain + Config.control.release;
        //task
        final PostD mCall = new PostD(_ctx, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                _ctx.runOnUiThread(success_call);
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
         /*       _ctx.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {*/
                dialog_collection.progress_bar_start(R.string.wait);
            }
                /*});
            }*/
        });

        mCall.setBody(cf.toJson()).setURL(Q).execute();
    }
}
