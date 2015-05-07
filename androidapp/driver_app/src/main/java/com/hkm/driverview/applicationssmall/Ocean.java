package com.hkm.driverview.applicationssmall;

import android.app.Activity;
import android.app.Fragment;
import android.content.DialogInterface;
import android.graphics.Rect;
import android.os.Bundle;
import android.os.Handler;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.asynhkm.productchecker.Model.GetTask;
import com.asynhkm.productchecker.Util.Tool;
import com.cocosw.bottomsheet.BottomSheet;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hkm.driverview.ListOrderes.OrderAdapter;
import com.hkm.driverview.life.json.OrderCustomer;
import com.hkm.driverview.MainActivity;
import com.hkm.driverview.R;
import com.hkm.driverview.life.Config;
import com.hkm.driverview.managers.OrderListQ;
import com.hkm.driverview.managers.TimerRequestList;
import com.hkm.driverview.ui.DialogTools;
import com.melnykov.fab.FloatingActionButton;

import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by hesk on 7/5/15.
 */
public class Ocean extends APIBaseFragment {
    private static final String TAG = "OCEAN_FRAGMENT_X";
    private SwipeRefreshLayout swipcontainer;


    private BottomSheet obs;
    private Activity mact;
    private DialogTools dialog_collection;
    private OrderAdapter mAdapter;
    private List<OrderCustomer> mMessages = new ArrayList<OrderCustomer>();
    private RecyclerView mMessagesView;
    private static TimerRequestList timer;


    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);


        mact = activity;
    }

    @Override
    public void onDetach() {
        super.onDetach();
        try {
            Field childFragmentManager = Fragment.class.getDeclaredField("mChildFragmentManager");
            childFragmentManager.setAccessible(true);
            childFragmentManager.set(this, null);
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        dialog_collection = ((MainActivity) mact).getDialogInstance();
        mAdapter = new OrderAdapter(mact, mMessages);

        return inflater.inflate(R.layout.fragment_listview, container, false);
    }


    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        setHasOptionsMenu(true);

        swipcontainer = (SwipeRefreshLayout) view.findViewById(R.id.containerswipe);

        /**
         * order fragment
         */

        obs = new BottomSheet.Builder(mact).title(R.string.wait).sheet(
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
                enableFloatingButton();
            }
        }).setOnDismissListener(new DialogInterface.OnDismissListener() {
            @Override
            public void onDismiss(DialogInterface dialog) {
                enableFloatingButton();
            }
        }).build();

        mMessagesView = (RecyclerView) view.findViewById(R.id.messages);
        mMessagesView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mMessagesView.setAdapter(mAdapter);


        button = (FloatingActionButton) view.findViewById(R.id.full_menu);
        mMessagesView.setOnScrollListener(new scroller());
        button.attachToRecyclerView(mMessagesView);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                obs.show();
                button.setEnabled(false);
            }
        });
        swipcontainer.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                //handler.post(refreshing);
                request();
            }
        });
        swipcontainer.setEnabled(false);
        initTimer();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

    }

    @Override
    public void onPause() {
        super.onPause();
        timer.pause();
    }

    @Override
    public void onStop() {
        super.onStop();
        timer.pause();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (timer != null)
            timer.resume();
    }


    /**
     * other functions
     */

    public void initTimer() {
        timer = new TimerRequestList(Config._default.refresh_time, new TimerRequestList.cbtask() {
            @Override
            public void exe() {
                request();
            }
        });
    }

    private void scrollToBottom() {
        mMessagesView.scrollToPosition(mAdapter.getItemCount() - 1);
    }


    private class scroller extends RecyclerView.OnScrollListener {
        @Override
        public void onScrollStateChanged(RecyclerView view, int state) {

        }

        @Override
        public void onScrolled(RecyclerView recyclerView, int dx, int dy) {
            int top = recyclerView.getChildAt(0).getTop();
            int topRowVerticalPosition =
                    (recyclerView == null || recyclerView.getChildCount() == 0) ? 0 : top;
            Log.d(TAG, "top: " + top);
            // swipcontainer.setEnabled(topRowVerticalPosition >= 0);
        }
    }


    private FloatingActionButton button;

    public void enableFloatingButton() {
        button.setEnabled(true);
        button.hide();
    }

    private void addLog(String message) {
        mMessages.add(
                new OrderCustomer.Builder(OrderCustomer.TYPE_LOG).message(message).build()
        );
        mAdapter.notifyItemInserted(mMessages.size() - 1);
        scrollToBottom();
    }

    private void PostProcessJson(final String data) {
        final GsonBuilder gb = new GsonBuilder();
        final Gson gson = gb.create();
        try {
            ArrayList<OrderCustomer> lis = gson.fromJson(data, new TypeToken<ArrayList<OrderCustomer>>() {
            }.getType());
            mMessages.clear();
            mMessages.addAll(lis);
            Log.d(TAG, lis.toString());
            mAdapter.notifyDataSetChanged();
        } catch (Exception e) {
            Tool.trace(getActivity(), e.getMessage());
        }
    }

    public void initializeAPI() {
        request();
    }

    private void request() {
        if (Config.credential_object == null || swipcontainer == null || dialog_collection == null)
            return;

        final OrderListQ mCall = new OrderListQ(getActivity(), new GetTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                swipcontainer.setRefreshing(false);
                PostProcessJson(data);
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                dialog_collection.showSimpleMessage(msg);
                swipcontainer.setRefreshing(false);
            }

            @Override
            public void beforeStart(final GetTask task) {
                swipcontainer.setRefreshing(true);
            }
        });
        mCall.setURL(Config.getCallListAPI()).execute();
    }

    private boolean isRefreshing() {
        return swipcontainer.isRefreshing();
    }

    private Handler handler = new Handler();
    private final Runnable refreshing = new Runnable() {
        public void run() {
            try {
                if (isRefreshing()) {
                    // re run the verification after 1 second
                    handler.postDelayed(this, 1000);
                } else {
                    // stop the animation after the data is fully loaded
                    swipcontainer.setRefreshing(false);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };



}
