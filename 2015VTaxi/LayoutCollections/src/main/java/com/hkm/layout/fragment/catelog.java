package com.hkm.layout.fragment;

import android.app.Activity;
import android.app.Fragment;
import android.content.Context;
import android.graphics.Paint;
import android.os.Bundle;
import android.support.annotation.IdRes;
import android.support.annotation.LayoutRes;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.LinearLayoutManager;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;

import com.hkm.layout.Module.easyAdapter;
import com.hkm.layout.R;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerView;
import com.marshalchen.ultimaterecyclerview.UltimateRecyclerviewViewHolder;
import com.marshalchen.ultimaterecyclerview.divideritemdecoration.HorizontalDividerItemDecoration;
import com.squareup.picasso.Picasso;

/**
 * Created by hesk on 30/6/15.
 */
public abstract class catelog<adapter extends easyAdapter, binder extends UltimateRecyclerviewViewHolder> extends Fragment {
    public static String TAG = "catelog";
    public final static String BRAND_NAME = "BrandName", SLUG = "slug", REQUEST_TYPE = "typerequest";
    public UltimateRecyclerView listview_layout;
    protected Picasso picasso;
    public static String URL = "data_url";
    public static String FRAGMENTTITLE = "fragment_title";
    public static String SAVELOADDATA = "listing_data";

    @Override
    public void onAttach(Activity activity) {
        super.onAttach(activity);
    }

    @Override
    public void onAttach(Context activity) {
        super.onAttach(activity);
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        return inflater.inflate(getFragmentResId(), container, false);
    }

    @IdRes
    protected int getUltimate_recycler_viewResId() {
        return R.id.lylib_list_uv;
    }

    @LayoutRes
    protected abstract int getFragmentResId();

    protected abstract void onClickItem(final String route);

    protected abstract int getColumn();

    protected abstract adapter getAdatperWithdata();

    protected abstract void setUltimateRecyclerViewExtra(final UltimateRecyclerView listview, final adapter madapter);

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
     *
     * @param confirmAdapter the adapter
     */
    protected abstract void loadDataInitial(final adapter confirmAdapter);

    protected LinearLayoutManager mLayoutManager;
    protected adapter madapter;
    protected ProgressBar mProgress;

    protected void renderviewlayout(View view) throws Exception {
        listview_layout = (UltimateRecyclerView) view.findViewById(getUltimate_recycler_viewResId());
        listview_layout.setHasFixedSize(true);
        listview_layout.setSaveEnabled(true);
        picasso = Picasso.with(getActivity());
        listview_layout.setAdapter(madapter = getAdatperWithdata());
        getProgressbar(view);
        setUltimateRecyclerViewExtra(listview_layout, madapter);
        if (mLayoutManager == null) {
            if (isLinearRVLayout()) {
                mLayoutManager = new LinearLayoutManager(getActivity());
            } else {
                mLayoutManager = new GridLayoutManager(view.getContext(), getColumn(), LinearLayoutManager.VERTICAL, false);
            }
        }
        final HorizontalDividerItemDecoration decor = new HorizontalDividerItemDecoration
                .Builder(getActivity())
                .paint(getsolid())
                .showLastDivider()
                .build();

        if (listHeaderPadding()) {
            RelativeLayout height_rv = (RelativeLayout) view.findViewById(R.id.lylib_before);
            ViewGroup.LayoutParams m = height_rv.getLayoutParams();
            m.height = getActivity().getResources().getDimensionPixelSize(R.dimen.photoMarginTop);
        }
        if (withDecor()) listview_layout.addItemDecoration(decor);
        listview_layout.setLayoutManager(mLayoutManager);
    }

    protected boolean listHeaderPadding() {
        return false;
    }

    protected Paint getsolid() {
        Paint paint = new Paint();
        int color_i = ContextCompat.getColor(getActivity(), R.color.title_default_color);
        float fl = getResources().getDimension(R.dimen.divider_stroke_width_treelist_view);
        paint.setColor(color_i);
        paint.setStrokeWidth(fl);
        return paint;
    }

    protected boolean withDecor() {
        return false;
    }

    protected boolean isLinearRVLayout() {
        return false;
    }

    protected void getProgressbar(View view) {
        try {
            mProgress = (ProgressBar) view.findViewById(R.id.lylib_ui_loading_circle);
        } catch (Exception e) {
            //unable to find loading progress bar
        }
    }

    protected void showLoadingCircle() {
        if (mProgress != null) {
            mProgress.setVisibility(View.VISIBLE);
            mProgress.animate().alpha(1f);
        }
    }

    protected void hideLoadingCircle() {
        if (mProgress != null && mProgress.getVisibility() == View.VISIBLE) {
            mProgress.animate().alpha(0f).withEndAction(new Runnable() {
                @Override
                public void run() {
                    mProgress.setVisibility(View.INVISIBLE);
                }
            });
        }
    }

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {

        try {
            renderviewlayout(view);
            if (getArguments() != null) {
                if (onArguments(getArguments())) {
                    showLoadingCircle();
                    loadDataInitial(madapter);
                }
            }
        } catch (Exception e) {
            Log.d(TAG, e.getMessage());
        }

    }
}