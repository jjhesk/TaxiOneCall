package com.hkm.layout.fragment;

import android.app.Fragment;
import android.os.Bundle;
import android.support.annotation.LayoutRes;
import android.support.v7.widget.LinearLayoutManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;

import com.hkm.layout.R;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerView;
import com.marshalchen.ultimaterecyclerview.uiUtils.ScrollSmoothLineaerLayoutManager;
import com.squareup.picasso.Picasso;

/**
 * Created by hesk on 22/12/15.
 */
public abstract class applicationList extends Fragment {
    protected UltimateRecyclerView listview_layout;
    private ProgressBar loadingbar;
    protected Picasso picasso;
    public static final String TAG = "applicationList";

    @LayoutRes
    protected abstract int getlayout();


    protected abstract void setUltimateRecyclerViewExtra(final UltimateRecyclerView listview);

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(getlayout(), container, false);
    }


    /**
     * step 1:
     * takes the arguement form the intent bundle and determine if there is a need to queue a loading process. If that is a yes then we need to load up the data before displaying the list out.
     *
     * @param r and the data bundle
     * @return tells if  there is a loading process to be done before hand
     */
    protected abstract boolean onArguments(final Bundle r);

    /**
     * step 2:
     * this is the call for the loading the data stream externally
     */
    protected abstract void loadDataInitial();

    protected abstract void initalizePlain();

    protected ScrollSmoothLineaerLayoutManager mLayoutManager;


    protected int getSmoothDuration() {
        return 300;
    }


    protected void doneInitialLoading() {

        loadingbar.animate().alpha(0).withEndAction(new Runnable() {
            @Override
            public void run() {
                loadingbar.setVisibility(View.GONE);
            }
        });
    }

    private void renderviewlayout(View view) throws Exception {
        listview_layout = (UltimateRecyclerView) view.findViewById(R.id.lylib_list_uv);
        loadingbar = (ProgressBar) view.findViewById(R.id.lylib_ui_loading_circle);
        mLayoutManager = new ScrollSmoothLineaerLayoutManager(view.getContext(), LinearLayoutManager.VERTICAL, false, getSmoothDuration());
        listview_layout.setLayoutManager(mLayoutManager);
        listview_layout.setHasFixedSize(false);
        listview_layout.setSaveEnabled(false);
        picasso = Picasso.with(getActivity());
        setUltimateRecyclerViewExtra(listview_layout);
    }

    protected void renderOtherViews(View view) {
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        if (savedInstanceState == null) {
            try {
                renderviewlayout(view);
                renderOtherViews(view);
                if (getArguments() != null) {
                    if (onArguments(getArguments())) {
                        loadDataInitial();
                    } else {

                    }
                }
            } catch (Exception e) {
                Log.d(TAG, e.getMessage());
            }
        } else {
            Log.d(TAG, "back from pause");
        }
    }


    protected abstract void onClickItem(long id);
}
