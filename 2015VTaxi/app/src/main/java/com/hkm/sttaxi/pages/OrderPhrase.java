package com.hkm.sttaxi.pages;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.hkm.layout.Module.easyAdapter;
import com.hkm.layout.fragment.applicationList;
import com.hkm.sttaxi.GenModule.Util;
import com.hkm.sttaxi.LocationApp;
import com.hkm.sttaxi.R;
import com.hkm.taxisdk.api.model.OrderTicket;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerView;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerviewViewHolder;

import java.util.List;

/**
 * A placeholder fragment containing a simple view.
 */
public class OrderPhrase extends applicationList {
    private OrderTicket target_ticket;

    public OrderPhrase() {
    }


    @Override
    protected int getlayout() {
        return R.layout.order;
    }

    public static class binder extends UltimateRecyclerviewViewHolder {
        public final ImageView im;
        public final TextView label, location_label;
        public final ImageButton close_btn;
        public final RelativeLayout hit;

        public binder(View itemView) {
            super(itemView);
            im = (ImageView) itemView.findViewById(R.id.nxi_indication);
            label = (TextView) itemView.findViewById(R.id.nxi_label_top);
            location_label = (TextView) itemView.findViewById(R.id.nxi_location_bottom);
            close_btn = (ImageButton) itemView.findViewById(R.id.nxi_section_close_button);
            hit = (RelativeLayout) itemView.findViewById(R.id.nxi_label_box);
        }
    }

    public class cateadapter extends easyAdapter<String, binder> {

        /**
         * dynamic object to start
         *
         * @param list the list source
         */
        public cateadapter(List<String> list) {
            super(list);
        }

        /**
         * the layout id for the normal data
         *
         * @return the ID
         */
        @Override
        protected int getNormalLayoutResId() {
            return R.layout.item_order_locations;
        }

        @Override
        protected OrderPhrase.binder newViewHolder(View view) {
            return new OrderPhrase.binder(view);
        }

        protected String positionDestination(final int position) {
            if (target_ticket.getDestinations().size() == 0) return "";
            String get = target_ticket.getDestinations().get(position - 1);
            if (get.equalsIgnoreCase(""))
                return getString(R.string.addresshintend);
            return get;
        }

        @Override
        protected void withBindHolder(final binder holder, final String data, final int position) {
            holder.hit.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onClickItem(position);
                }
            });

            String fill_location = position == 0 ?
                    target_ticket.getMylocation().equalsIgnoreCase("") ?
                            getString(R.string.addresshintstart) :
                            target_ticket.getMylocation() :
                    positionDestination(position);

            /*target_ticket.getDestinations().size() == 0 ? "" :
                            target_ticket.getDestinations().get(position - 1).equalsIgnoreCase("") ?
                                    getString(R.string.addresshintend) :
                                    target_ticket.getDestinations().get(position - 1);*/

            holder.location_label.setText(fill_location);
            String lotion = position == 0 ? getString(R.string.label_from) : getString(R.string.label_to);
            holder.label.setText(lotion);

            if (position > 0) {
                holder.im.setImageResource(R.drawable.loc_pass);
            }
            //if my location is empty
            if (position == 0 && target_ticket.getMylocation().equalsIgnoreCase("")) {
                holder.close_btn.setImageResource(R.drawable.ic_gps);
                holder.close_btn.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        CallGPSLocation(position);
                    }
                });
            }
            //if the destination for target is more then one
            if (position > 0) {
                if (target_ticket.getDestinations().get(position - 1).equalsIgnoreCase("")) {
                    holder.close_btn.setImageResource(R.drawable.ic_search);
                    holder.close_btn.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            CallGPSLocation(position - 1);
                        }
                    });
                } else {
                    holder.close_btn.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View v) {
                            clearDataPosition(position - 1);
                        }
                    });
                }
            }
        }

        @Override
        public void onBindHeaderViewHolder(RecyclerView.ViewHolder viewHolder, int i) {

        }

        @Override
        public UltimateRecyclerviewViewHolder onCreateHeaderViewHolder(ViewGroup viewGroup) {
            return new UltimateRecyclerviewViewHolder(viewGroup);
        }
    }

    protected void CallGPSLocation(final int returnPosition_zero) {

    }

    protected void clearDataPosition(final int address_position) {

    }

    @Override
    protected void setUltimateRecyclerViewExtra(UltimateRecyclerView listview) {
        listview.setClipToPadding(false);
        target_ticket = Util.newTicket();
        cateadapter madapter = new cateadapter(target_ticket.getDestinations());
        listview.setAdapter(madapter);
        doneInitialLoading();
    }

    /**
     * step 1:
     * takes the arguement form the intent bundle and determine if there is a need to queue a loading process. If that is a yes then we need to load up the data before displaying the list out.
     *
     * @param r and the data bundle
     * @return tells if  there is a loading process to be done before hand
     */
    @Override
    protected boolean onArguments(Bundle r) {
        return false;
    }

    /**
     * step 2:
     * this is the call for the loading the data stream externally
     */
    @Override
    protected void loadDataInitial() {

    }

    @Override
    protected void initalizePlain() {

    }

    @Override
    protected void renderOtherViews(View view) {

    }

    protected String getLabelByPosition(int id) {
        if (id == 0) {
            return target_ticket.getMylocation();
        } else {
            return target_ticket.getDestinations().get(id);
        }
    }

    @Override
    protected void onClickItem(long id) {

    }

    protected void onClickItem(int id) {
        Bundle h = new Bundle();
        h.putInt("loc_id", id);
        h.putString("label", getLabelByPosition(id));
        Intent i = new Intent(getActivity(), LocationApp.class);
        i.putExtras(h);
        getActivity().startActivityForResult(i, 9001, h);
    }

    @Override
    public void onPause() {
        super.onPause();
    }


    @Override
    public void onResume() {
        super.onResume();
    }
}
