package com.hkm.sttaxi;

import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.hkm.layout.Module.easyAdapter;
import com.hkm.layout.fragment.applicationList;
import com.hkm.taxisdk.Model.OrderTicket;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerView;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerviewViewHolder;

import java.util.List;

/**
 * A placeholder fragment containing a simple view.
 */
public class OrderPhrase extends applicationList {

    public OrderPhrase() {
    }


    @Override
    protected int getlayout() {
        return R.layout.order;
    }

    public static class binder extends UltimateRecyclerviewViewHolder {
        public final ImageView im;
        public final TextView tvtitle, tvdesc, tvprice;

        public binder(View itemView) {
            super(itemView);
            im = (ImageView) itemView.findViewById(R.id.imageholder);
            tvtitle = (TextView) itemView.findViewById(R.id.product_title);
            tvdesc = (TextView) itemView.findViewById(R.id.product_short_desc);
            tvprice = (TextView) itemView.findViewById(R.id.final_price);
        }
    }

    public class cateadapter extends easyAdapter<OrderTicket, binder> {

        /**
         * dynamic object to start
         *
         * @param list the list source
         */
        public cateadapter(List<OrderTicket> list) {
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

        @Override
        protected void withBindHolder(final binder holder, final OrderTicket data, int position) {
            holder.im.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    onClickItem(data.getTicketId());
                }
            });
            holder.tvtitle.setText(data.get_brand_name());
            holder.tvdesc.setText(data.getTitle());
            holder.tvprice.setText(StoreUtil.getPriceField(getActivity(), data));
        }

        @Override
        public void onBindHeaderViewHolder(RecyclerView.ViewHolder viewHolder, int i) {

        }

        @Override
        public UltimateRecyclerviewViewHolder onCreateHeaderViewHolder(ViewGroup viewGroup) {
            return new UltimateRecyclerviewViewHolder(viewGroup);
        }
    }

    @Override
    protected void setUltimateRecyclerViewExtra(UltimateRecyclerView listview) {
        listview.setClipToPadding(false);

        madapter = new cateadapter(reponseNormal.product_list.getlist());
        listview_layout.setAdapter(madapter);
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

    @Override
    protected void onClickItem(long id) {

    }


}
