package com.hkm.driverview.ListOrderes;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.content.Intent;
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
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hkm.driverview.R;
import com.hkm.driverview.RegLogin;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.common.flux.OrderListQ;
import com.hkm.driverview.ui.DialogTools;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


/**
 * Created by hesk on 1/23/2015.
 */
public class FragmentX extends Fragment {
    public FragmentX() {
        super();
    }

    private static final String TAG = "FragmentX";

    private Context _ctx;
    private DialogTools dialog_collection;
    private OrderAdapter mAdapter;
    private Identity logininfo;
    private List<OrderCustomer> mMessages = new ArrayList<OrderCustomer>();
    private RecyclerView mMessagesView;

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        mAdapter = new OrderAdapter(activity, mMessages);
        logininfo = new Identity(activity);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_listview, container, false);
    }


    private void scrollToBottom() {
        mMessagesView.scrollToPosition(mAdapter.getItemCount() - 1);
    }

    private void startRegLogin() {
        Intent intent = new Intent(getActivity(), RegLogin.class);
        getActivity().startActivityForResult(intent, Config.INTENT_CODE_LOGIN);
    }

    private SwipeRefreshLayout swipper;

    private class scroller extends RecyclerView.OnScrollListener {
        @Override
        public void onScrollStateChanged(RecyclerView view, int state) {

        }

        @Override
        public void onScrolled(RecyclerView view, int dx, int dy) {
            boolean enable = false;
            if (view != null && view.getChildCount() > 0) {
                // check if the first item of the list is visible
                //  boolean firstItemVisible = view.getChildPosition(view.getChildAt(0)) == 0;
                // check if the top of the first item is visible
                // boolean topOfFirstItemVisible = view.getChildAt(0).getTop() == 0;
                boolean topOfFirstItemVisible = dy == 0;
                // enabling or disabling the refresh layout
                //    enable = firstItemVisible && topOfFirstItemVisible;
                enable = topOfFirstItemVisible;
            }
            swipper.setEnabled(enable);
        }
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        swipper = (SwipeRefreshLayout) view.findViewById(R.id.swipper);
        mMessagesView = (RecyclerView) view.findViewById(R.id.messages);
        mMessagesView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mMessagesView.setAdapter(mAdapter);
        if (logininfo.hasAuthen() && Config.credential_object != null) {
            run();
        } else {
            startRegLogin();
        }
        mMessagesView.setOnScrollListener(new scroller());
        swipper.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {

            @Override
            public void onRefresh() {
                // get the new data from you data source
                // TODO : request data here
                // our swipeRefreshLayout needs to be notified when the data is returned in order for it to stop the animation
                handler.post(refreshing);
            }
        });
        // sets the colors used in the refresh animation
      /*  swipper.setColorSchemeResources(R.color.blue_bright, R.color.green_light,
                R.color.orange_light, R.color.red_light);*/
    }

    public void runagain() {
        exec = Executors.newSingleThreadScheduledExecutor();
        run();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        dialog_collection = new DialogTools(getActivity());
    }

    private void addLog(String message) {
        mMessages.add(
                new OrderCustomer.Builder(OrderCustomer.TYPE_LOG).message(message).build()
        );
        mAdapter.notifyItemInserted(mMessages.size() - 1);
        scrollToBottom();
    }

    private void addParticipantsLog(int numUsers) {
        addLog(getResources().getQuantityString(R.plurals.message_participants, numUsers, numUsers));
    }

    private void addMessage(String username, String message) {
        mMessages.add(new OrderCustomer.Builder(OrderCustomer.TYPE_MESSAGE)
                .username(username).message(message).build());
        mAdapter.notifyItemInserted(mMessages.size() - 1);
        scrollToBottom();
    }

    private void addTyping(String username) {
        mMessages.add(new OrderCustomer.Builder(OrderCustomer.TYPE_ACTION)
                .username(username).build());
        mAdapter.notifyItemInserted(mMessages.size() - 1);
        scrollToBottom();
    }


    private static ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
    private final Runnable maintask = new Runnable() {
        public void run() {
            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    //  if (Config.credential_object != null) {
                    request();
                    // } else {
                    //       exec.shutdown();
                    //      startRegLogin();
                    //  }

                }
            });
        }
    };

    private void run() {
        exec.scheduleAtFixedRate(maintask, 1000, Config._default.refresh_time, TimeUnit.MILLISECONDS);
        //request();
    }

    public void stopLoopRequest() {
        exec.shutdown();
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

    private void request() {
        if (Config.credential_object == null) return;
        final String Q = Config.domain + Config.control.getcalllist + "?token=" + Config.credential_object.getToken();
        final OrderListQ mCall = new OrderListQ(getActivity(), new GetTask.callback() {
            @Override
            public void onSuccess(final String data) {
                Log.d(TAG, data);
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        PostProcessJson(data);
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
                        dialog_collection.showSimpleMessage(msg);
                    }
                });

            }

            @Override
            public void beforeStart(final GetTask task) {
                getActivity().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {

                        dialog_collection.progress_bar_start(R.string.wait);
                    }
                });
            }
        });
        mCall.setURL(Q).execute();
    }

    private boolean isRefreshing() {
        return true;
    }

    private Handler handler = new Handler();
    private final Runnable refreshing = new Runnable() {
        public void run() {
            try {
                // TODO : isRefreshing should be attached to your data request status
                if (isRefreshing()) {
                    // re run the verification after 1 second
                    handler.postDelayed(this, 1000);
                } else {
                    // stop the animation after the data is fully loaded
                    swipper.setRefreshing(false);
                    // TODO : update your list with the new data
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };

}
