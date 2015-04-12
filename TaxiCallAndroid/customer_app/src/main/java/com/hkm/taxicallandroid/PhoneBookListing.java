package com.hkm.taxicallandroid;

import android.app.Activity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
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
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.phone_list);
        ultimateRecyclerView = (UltimateRecyclerView) findViewById(R.id.ultimate_recycler_view);
        ultimateRecyclerView.setHasFixedSize(false);
        List<String> stringList = new ArrayList<>();
        simpleRecyclerViewAdapter = new SimpleAdapter(stringList);

        stringList.add("111");
        stringList.add("aaa");
        stringList.add("222");
        stringList.add("33");
        stringList.add("44");
        stringList.add("55");
        stringList.add("66");
        stringList.add("11771");

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
