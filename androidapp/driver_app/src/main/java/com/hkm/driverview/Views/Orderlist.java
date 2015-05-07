package com.hkm.driverview.Views;

import android.annotation.SuppressLint;
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
import com.cocosw.bottomsheet.BottomSheet;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;
import com.hkm.driverview.ListOrderes.OrderAdapter;
import com.hkm.driverview.ListOrderes.OrderCustomer;
import com.hkm.driverview.R;
import com.hkm.driverview.RegLogin;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.managers.OrderListQ;
import com.hkm.driverview.managers.TimerRequestList;
import com.hkm.driverview.ui.DialogTools;
import com.melnykov.fab.FloatingActionButton;

import java.util.ArrayList;
import java.util.List;


/**
 * Created by hesk on 1/23/2015.
 */
@SuppressLint("ValidFragment")
public class Orderlist extends Fragment {
    private final SwipeRefreshLayout swipeui;
    private BottomSheet bs;

    @SuppressLint("ValidFragment")
    public Orderlist(final SwipeRefreshLayout ui, final BottomSheet bbs) {
        super();
        swipeui = ui;
        bs = bbs;
    }

    private static final String TAG = "FragmentX";
    private Context _ctx;
    private DialogTools dialog_collection;
    private OrderAdapter mAdapter;
    private Identity logininfo;
    private List<OrderCustomer> mMessages = new ArrayList<OrderCustomer>();
    private RecyclerView mMessagesView;
    private static TimerRequestList timer;

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
            // swipeui.setEnabled(topRowVerticalPosition >= 0);
        }
    }

    private FloatingActionButton button;

    public void enableFloatingButton() {
        button.setEnabled(true);
        button.hide();
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mMessagesView = (RecyclerView) view.findViewById(R.id.messages);
        mMessagesView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mMessagesView.setAdapter(mAdapter);
        if (logininfo.hasAuthen() && Config.credential_object != null) {
            request();
        } else {
            startRegLogin();
        }

        button = (FloatingActionButton) view.findViewById(R.id.full_menu);
        mMessagesView.setOnScrollListener(new scroller());
        button.attachToRecyclerView(mMessagesView);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                bs.show();
                button.setEnabled(false);
            }
        });
        swipeui.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                //handler.post(refreshing);
                request();
            }
        });
        swipeui.setEnabled(false);
        initTimer();

    }

    public void initTimer() {
        timer = new TimerRequestList(Config._default.refresh_time, new TimerRequestList.cbtask() {
            @Override
            public void exe() {
                request();
            }
        });
    }

    @Override
    public void onPause() {
        super.onPause();
        timer.pause();
    }

    @Override
    public void onResume() {
        super.onResume();
        if (timer != null)
            timer.resume();
    }

    @Override
    public void onStop() {
        super.onStop();
        timer.pause();
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
                swipeui.setRefreshing(false);
                PostProcessJson(data);
            }

            @Override
            public void onFailure(final String msg) {
                Log.d(TAG, msg);
                dialog_collection.showSimpleMessage(msg);
                swipeui.setRefreshing(false);
            }

            @Override
            public void beforeStart(final GetTask task) {
                swipeui.setRefreshing(true);
            }
        });
        mCall.setURL(Q).execute();
    }

    private boolean isRefreshing() {
        return swipeui.isRefreshing();
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
                    swipeui.setRefreshing(false);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    };

}
