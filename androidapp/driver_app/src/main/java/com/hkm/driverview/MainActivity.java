package com.hkm.driverview;

import android.annotation.SuppressLint;
import android.app.Fragment;
import android.app.FragmentManager;
import android.content.Intent;
import android.support.v4.view.ViewPager;
import android.support.v7.app.ActionBarActivity;
import android.os.Bundle;
import android.util.Log;

import com.asynhkm.productchecker.Model.CallTask;
import com.cocosw.bottomsheet.BottomSheet;
import com.hkm.driverview.ListOrderes.ViewpagerAdapter;
import com.hkm.driverview.applicationssmall.Ocean;
import com.hkm.driverview.life.json.OrderCustomer;
import com.hkm.driverview.life.Config;
import com.hkm.driverview.life.LifeCycleApp;
import com.hkm.driverview.managers.PostD;
import com.hkm.driverview.common.schema.simpleId;
import com.hkm.driverview.ui.DialogTools;


import it.neokree.materialtabs.MaterialTab;
import it.neokree.materialtabs.MaterialTabHost;
import it.neokree.materialtabs.MaterialTabListener;

public class MainActivity extends ActionBarActivity implements MaterialTabListener {
    private final String LOG_TAG = "MainActivity";
    private final String TAG = "DriverDaView";

    private Ocean order_fragment;
    private DialogTools dialog_collection;
    private BottomSheet obs;
    private MaterialTabHost mTab;
    private ViewPager pager;
    private ViewpagerAdapter pagerAdapter;
    private FragmentManager mChildFragmentManager;
    private LifeCycleApp appBase;

    @SuppressLint("ResourceAsColor")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // getSupportActionBar().hide();
        dialog_collection = new DialogTools(this);
        appBase = (LifeCycleApp) getApplication();
        setContentView(R.layout.act_main);




        //ParseAnalytics.trackAppOpenedInBackground(getIntent());

        /*  getFragmentManager()
                .beginTransaction()
                .add(R.id.container, order_fragment)
                .commit();*/

        mTab = (MaterialTabHost) findViewById(R.id.materialTabHost);
        pager = (ViewPager) findViewById(R.id.viewpager);
        mTab.setBorderReferenceColor(1, R.color.divider_press);
        mTab.setCustomBackground(R.drawable.tab_host_bottom_line);
        mTab.addTab(mTab.createCustomTextTab(R.layout.item_tab, "RECENT", false).setTabListener(this));
        mTab.addTab(mTab.createCustomTextTab(R.layout.item_tab, "Ocean", false).setTabListener(this));
        // init view pager
        pagerAdapter = new ViewpagerAdapter(mChildFragmentManager = getFragmentManager());
        pager.setAdapter(pagerAdapter);
        pager.setOnPageChangeListener(new ViewPager.SimpleOnPageChangeListener() {
            @Override
            public void onPageSelected(int position) {
                // when user do a swipe the selected tab change
                mTab.setSelectedNavigationItem(position);
            }
        });

        if (!appBase.hasAuthenticated() || Config.credential_object == null) {
            startRegLogin();
        }
    }

    private void startRegLogin() {
        Intent intent = new Intent(this, RegLogin.class);
        startActivityForResult(intent, Config.INTENT_CODE_LOGIN);
    }

    public DialogTools getDialogInstance() {
        return dialog_collection;
    }

    @Override
    public void onTabSelected(MaterialTab materialTab) {
        int pos = materialTab.getPosition();
        pager.setCurrentItem(pos, true);
    }


    @Override
    public void onTabReselected(MaterialTab materialTab) {

    }

    @Override
    public void onTabUnselected(MaterialTab materialTab) {
        //  tab_selected_final(materialTab);

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == Config.INTENT_CODE_LOGIN || requestCode == Config.INTENT_CODE_SINGLE_ORDER) {
            // A contact was picked.  Here we will just display it
            // to the user.
            if (pager.getCurrentItem() == 0) {
                Ocean fragment = (Ocean) pagerAdapter.getItem(0);
                fragment.initTimer();
            }
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
        //consolidate
        Config.current_view_order = order;
        final simpleId cf = new simpleId(cId, appBase.getDriverNumber());

        //task
        final PostD mCall = new PostD(MainActivity.this, new CallTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                MainActivity.this.runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        //   fragmentx.stopLoopRequest();
                        Intent orderintent = new Intent(MainActivity.this, OrderView.class);
                        startActivityForResult(orderintent, Config.INTENT_CODE_SINGLE_ORDER);
                        dialog_collection.progress_bar_dismiss();
                    }
                });
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                MainActivity.this.runOnUiThread(new Runnable() {
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

        mCall.setBody(cf.toJson()).setURL(Config.getInquiryAPI()).execute();
    }
}
