package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;

import com.hkm.taxicallandroid.list.SimpleAdapter;
import com.marshalchen.ultimaterecyclerview.ItemTouchListenerAdapter;
import com.marshalchen.ultimaterecyclerview.Logs;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerView;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hesk on 4/12/2015.
 */
public class PhoneBookListing extends Activity {
    UltimateRecyclerView ultimateRecyclerView;
    SimpleAdapter simpleRecyclerViewAdapter;
    LinearLayoutManager linearLayoutManager;
    ItemTouchListenerAdapter itemTouchListenerAdapter;

    public class DataHold {
        public final String name;
        public final String number;

        public DataHold(String ntame, String ntumber) {
            name = ntame;
            number = ntumber;
        }
    }

    protected ArrayList<DataHold> getConstructedData(int k_array_id) {

        String[] xmlList = getResources().getStringArray(k_array_id);
        Log.d("test", "1st string is: pp");
        ArrayList<DataHold> n = new ArrayList<>();
        for (int i = 0; i < xmlList.length; i++) {
            String t = xmlList[i];
            String[] r = t.split(",");
            n.add(new DataHold(r[0], r[1]));
        }
        return n;
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.phone_list);
        ultimateRecyclerView = (UltimateRecyclerView) findViewById(R.id.ultimate_recycler_view);
        ultimateRecyclerView.setHasFixedSize(false);
        //int array_id = getIntent().getExtras().getInt("startbooknumberurl", -1);


        int array_id = getIntent().getExtras().getInt("startbooknumberurl", -1);
        int k_array_id = -1;
        if (array_id == 1) {
            k_array_id = R.array.book_urban_taxi_companies;
        } else if (array_id == 2) {
            k_array_id = R.array.book_nt_taxi_companies;
        }


        simpleRecyclerViewAdapter = new SimpleAdapter(getConstructedData(k_array_id));


        linearLayoutManager = new LinearLayoutManager(this);
        ultimateRecyclerView.setLayoutManager(linearLayoutManager);
        ultimateRecyclerView.setAdapter(simpleRecyclerViewAdapter);
        itemTouchListenerAdapter = new ItemTouchListenerAdapter(ultimateRecyclerView.mRecyclerView,
                new ItemTouchListenerAdapter.RecyclerViewOnItemClickListener() {
                    @Override
                    public void onItemClick(RecyclerView parent, View clickedView, int position) {
                        Logs.d("onItemClick()");
                        /*  if (actionMode != null && isDrag) {
                            toggleSelection(position);
                        }*/
                    }

                    @Override
                    public void onItemLongClick(RecyclerView parent, View clickedView, int position) {
                      /*  Logs.d("onItemLongClick()" + isDrag);
                        if (isDrag) {
                          Logs.d("onItemLongClick()" + isDrag);
                          toolbar.startActionMode(MainActivity.this);
                          toggleSelection(position);
                          dragDropTouchListener.startDrag();
                          ultimateRecyclerView.enableDefaultSwipeRefresh(false);
                        }*/
                    }
                });
        ultimateRecyclerView.mRecyclerView.addOnItemTouchListener(itemTouchListenerAdapter);
    }
}
