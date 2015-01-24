package com.hkm.driverview.ListOrderes;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.os.Bundle;
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
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.OrderListQ;
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

    private OrderAdapter mAdapter;

    private List<OrderCustomer> mMessages = new ArrayList<OrderCustomer>();

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
        mAdapter = new OrderAdapter(activity, mMessages);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_listview, container, false);
    }

    private RecyclerView mMessagesView;

    private void scrollToBottom() {
        mMessagesView.scrollToPosition(mAdapter.getItemCount() - 1);
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mMessagesView = (RecyclerView) view.findViewById(R.id.messages);
        mMessagesView.setLayoutManager(new LinearLayoutManager(getActivity()));
        mMessagesView.setAdapter(mAdapter);

        run();
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setHasOptionsMenu(true);
        dialog_collection = new DialogTools(getActivity());
    }

    private void addLog(String message) {
        mMessages.add(new OrderCustomer.Builder(OrderCustomer.TYPE_LOG)
                .message(message).build());
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

    private Context _ctx;
    private boolean returnfailure = false;
    private DialogTools dialog_collection;

    private final ScheduledExecutorService exec = Executors.newSingleThreadScheduledExecutor();
    private final Runnable maintask = new Runnable() {
        public void run() {
            getActivity().runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    // dialog_collection.showSimpleMessage("testing now");
                    request();
                }
            });
        }
    };

    private void run() {
        exec.scheduleAtFixedRate(maintask, 1000, Config._default.refresh_time, TimeUnit.MILLISECONDS);
        //request();
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
        final String Q = Config.domain + Config.control.getcalllist;

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
                    }
                });

                returnfailure = true;

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

       /* getActivity().runOnUiThread(new Runnable() {
            @Override
            public void run() {
                mCall.setURL(Q).setBody("{}").execute();
            }
        });*/
    }

}
