package com.hkm.driverview;

import android.app.Fragment;
import android.content.DialogInterface;
import android.content.Intent;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;

import com.asynhkm.productchecker.Model.CallTask;
import com.cocosw.bottomsheet.BottomSheet;
import com.hkm.driverview.Views.Orderlist;
import com.hkm.driverview.ListOrderes.OrderCustomer;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.managers.PostD;
import com.hkm.driverview.common.schema.simpleId;
import com.hkm.driverview.ui.DialogTools;
import com.melnykov.fab.FloatingActionButton;
import com.parse.ParseAnalytics;

public class DriverView extends ActionBarActivity {
    private final String LOG_TAG = "MainActivity";
    private final String TAG = "DriverDaView";
    private final String FILTER_NAME = this.getClass().getSimpleName();
    private SwipeRefreshLayout swipcontainer;
    private Identity idcard;
    private Orderlist order_fragment;
    private DialogTools dialog_collection;
    /*  private SlidingUpPanelLayout mLayout;
  */
    private BottomSheet obs;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dialog_collection = new DialogTools(this);
        idcard = new Identity(this);
        setContentView(R.layout.act_main);
        ParseAnalytics.trackAppOpenedInBackground(getIntent());
        swipcontainer = (SwipeRefreshLayout) findViewById(R.id.containerswipe);

    /*    mLayout = (SlidingUpPanelLayout) findViewById(R.id.sliding_layout);
        mLayout.setPanelState(SlidingUpPanelLayout.PanelState.HIDDEN);
*/

     /*   swipcontainer.setColorSchemeResources(R.color.blue_bright, R.color.green_light,
                R.color.orange_light, R.color.red_light);*/


        /**
         * order fragment
         */


        obs = new BottomSheet.Builder(this).title(R.string.wait).sheet(
                R.menu.list_helper

        ).listener(new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                switch (which) {
                    case R.id.share:
                        break;
                    case R.id.earn:
                        break;
                    case R.id.callinsight:
                        break;
                    case R.id.setting:
                        break;
                }
                order_fragment.enableFloatingButton();
            }
        }).setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialog) {
                order_fragment.enableFloatingButton();
            }
        }).build();
        order_fragment = new Orderlist(swipcontainer, obs);
        getFragmentManager()
                .beginTransaction()
                .add(R.id.container, order_fragment)
                .commit();


    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == Config.INTENT_CODE_LOGIN || requestCode == Config.INTENT_CODE_SINGLE_ORDER) {
            // A contact was picked.  Here we will just display it
            // to the user.
            order_fragment.initTimer();
        }
        super.onActivityResult(requestCode, resultCode, data);
    }


    @Override
    public void onAttachFragment(Fragment fragment) {
        // TODO Auto-generated method stub
        super.onAttachFragment(fragment);
        //  Tool.trace(this, fragment.getClass().getName());
        /*  if (fragment.getClass().getName().equalsIgnoreCase("com.hkm.driverview.ListOrderes.FragmentX")) {
            fragmentx = (order_listing_fragment) fragment;
        }*/
    }

    public void inquiryOrder(final String number, final String cId, final OrderCustomer order) {
        final String Q = Config.domain + Config.control.inquiry;
        //consolidate
        Config.current_view_order = order;
        final simpleId cf = new simpleId(cId, idcard.getNumbr());

        //task
        final PostD mCall = new PostD(DriverView.this, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                DriverView.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //   fragmentx.stopLoopRequest();
                        Intent orderintent = new Intent(DriverView.this, OrderView.class);
                        startActivityForResult(orderintent, Config.INTENT_CODE_SINGLE_ORDER);
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                DriverView.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        dialog_collection.progress_bar_dismiss();
                        dialog_collection.showSimpleMessage(msg);
                    }
                });
            }

            @Override
            public void beforeStart(final CallTask task) {
                dialog_collection.progress_bar_start("please wait");
            }
        });

        mCall.setBody(cf.toJson()).setURL(Q).execute();
    }
}
