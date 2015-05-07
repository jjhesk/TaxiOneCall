package com.hkm.taxicallandroid.list;

import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import com.hkm.taxicallandroid.PhoneBookListing;
import com.hkm.taxicallandroid.R;
import com.marshalchen.ultimaterecyclerview.UltimateViewAdapter;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hesk on 4/12/2015.
 */
public class SimpleAdapter extends UltimateViewAdapter {
    private ArrayList<PhoneBookListing.DataHold> stringList;

    public SimpleAdapter(ArrayList<PhoneBookListing.DataHold> stringList) {
        this.stringList = stringList;
    }


    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if (position < getItemCount() && (customHeaderView != null ? position <= stringList.size() : position < stringList.size()) && (customHeaderView != null ? position > 0 : true)) {

            PhoneBookListing.DataHold d = stringList.get(customHeaderView != null ? position - 1 : position);
            ((ViewHolder) holder)
                    .textViewSample
                    .setText(d.name);
            ((ViewHolder) holder)
                    .phonenumber
                    .setText(d.number);
            // ((ViewHolder) holder).itemView.setActivated(selectedItems.get(position, false));
        }

    }

    @Override
    public int getAdapterItemCount() {
        return stringList.size();
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recycler_view_adapter, parent, false);
        ViewHolder vh = new ViewHolder(v);
        return vh;
    }


    public void insert(PhoneBookListing.DataHold object, int position) {
        insert(stringList, object, position);
    }

    public void remove(int position) {
        remove(stringList, position);
    }

    public void clear() {
        clear(stringList);
    }

    @Override
    public void toggleSelection(int pos) {
        super.toggleSelection(pos);
    }

    @Override
    public void setSelected(int pos) {
        super.setSelected(pos);
    }

    @Override
    public void clearSelection(int pos) {
        super.clearSelection(pos);
    }


    public void swapPositions(int from, int to) {
        swapPositions(stringList, from, to);
    }


    class ViewHolder extends RecyclerView.ViewHolder {

        TextView textViewSample, phonenumber;
        ImageView imageViewSample;
        ProgressBar progressBarSample;

        public ViewHolder(View itemView) {
            super(itemView);
            textViewSample = (TextView) itemView.findViewById(R.id.textview);
            phonenumber = (TextView) itemView.findViewById(R.id.number);
            imageViewSample = (ImageView) itemView.findViewById(R.id.imageview);
            progressBarSample = (ProgressBar) itemView.findViewById(R.id.progressbar);
            progressBarSample.setVisibility(View.GONE);
            imageViewSample.setVisibility(View.GONE);
        }
    }
}
