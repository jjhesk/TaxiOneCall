package com.hkm.sttaxi.pages;

import android.os.Bundle;
import android.support.v7.widget.RecyclerView;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.hkm.layout.Module.easyAdapter;
import com.hkm.layout.fragment.catelog;
import com.hkm.sttaxi.GenModule.Util;
import com.hkm.sttaxi.R;
import com.hkm.taxisdk.Client.STCustomerCL;
import com.hkm.taxisdk.api.exception.ApiException;
import com.hkm.taxisdk.api.model.HKGovAddressRes;
import com.hkm.taxisdk.api.model.LocationChoice;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerView;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerviewViewHolder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import retrofit.Callback;
import retrofit.Response;
import retrofit.Retrofit;

/**
 * Created by hesk on 23/12/15.
 */
public class ListSearch extends catelog {

    @Override
    protected int getFragmentResId() {
        return R.layout.jazz_choices;
    }

    @Override
    protected int getColumn() {
        return 0;
    }

    @Override
    protected boolean isLinearRVLayout() {
        return true;
    }

    @Override
    protected void setUltimateRecyclerViewExtra(UltimateRecyclerView listview, easyAdapter madapter) {

    }

    @Override
    protected void onClickItem(String route) {

    }

    /**
     * step 2:
     * this is the call for the loading the data stream externally
     *
     * @param confirmAdapter the adapter
     */
    @Override
    protected void loadDataInitial(easyAdapter confirmAdapter) {
        hideLoadingCircle();
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
        return true;
    }

    @Override
    protected cateadapter getAdatperWithdata() {
        return new cateadapter(Util.newChoiceStartLv1());
    }

    public static class binder extends UltimateRecyclerviewViewHolder {
        public final ImageView im;
        public final TextView tvtitle, smaller_tx;
        public final RelativeLayout enter;

        public binder(View itemView) {
            super(itemView);
            im = (ImageView) itemView.findViewById(R.id.nxi_indication);
            tvtitle = (TextView) itemView.findViewById(R.id.nxi_label_top);
            smaller_tx = (TextView) itemView.findViewById(R.id.nxi_location_bottom);
            enter = (RelativeLayout) itemView.findViewById(R.id.lylib_main_screen);
        }
    }

    public class cateadapter extends easyAdapter<LocationChoice, binder> {

        /**
         * dynamic object to start
         *
         * @param list the list source
         */
        public cateadapter(List<LocationChoice> list) {
            super(list);
        }

        /**
         * the layout id for the normal data
         *
         * @return the ID
         */
        @Override
        protected int getNormalLayoutResId() {
            return R.layout.item_location_choice;
        }

        @Override
        protected ListSearch.binder newViewHolder(View view) {
            return new ListSearch.binder(view);
        }

        @Override
        protected void withBindHolder(final binder holder, final LocationChoice data, int position) {
            holder.enter.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    selection_location(data);
                }
            });
            holder.im.setImageResource(R.drawable.animated_clock);
            holder.tvtitle.setText(data.getDistrict());
            holder.smaller_tx.setText(data.getStreets());
        }

        @Override
        public void onBindHeaderViewHolder(RecyclerView.ViewHolder viewHolder, int i) {

        }

        @Override
        public UltimateRecyclerviewViewHolder onCreateHeaderViewHolder(ViewGroup viewGroup) {
            return new UltimateRecyclerviewViewHolder(viewGroup);
        }
    }

    protected STCustomerCL client;
    protected int level = 0;
    private HashMap<Integer, List<LocationChoice>> save_data = new HashMap<>();

    protected void setMap(List<LocationChoice> list) {
        if (!save_data.containsKey(level)) {
            save_data.put(level, list);
        }

    }

    protected void selection_location(LocationChoice choice) {
        if (level > 0) {
            //got this location and issue an return
            getActivity().finish();
            return;
        }
        level++;
        client = STCustomerCL.getInstance(getActivity());
        try {
            client.generateGovApi().getAddressQuery(choice.getDistrict(), new Callback<HKGovAddressRes>() {
                @Override
                public void onResponse(Response<HKGovAddressRes> response, Retrofit retrofit) {
                    if (level == 1) {
                        madapter.removeAll();
                        List<LocationChoice> l = Util.resultFromLevel1(response);
                        setMap(l);
                        madapter.addList(l);
                    }
                }

                @Override
                public void onFailure(Throwable t) {

                }
            });
        } catch (ApiException e) {
            e.printStackTrace();
        }
    }
}
