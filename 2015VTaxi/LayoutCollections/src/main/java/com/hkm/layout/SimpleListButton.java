package com.hkm.layout;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build;
import android.support.annotation.LayoutRes;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.FrameLayout;
import android.widget.RelativeLayout;

/**
 * Created by hesk on 27/10/15.
 */
public class SimpleListButton extends FrameLayout {

    @TargetApi(Build.VERSION_CODES.LOLLIPOP)
    public SimpleListButton(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
        super(context, attrs, defStyleAttr, defStyleRes);
        init();
    }

    public SimpleListButton(Context context, AttributeSet attrs) {
        super(context, attrs);
        init();
    }

    public SimpleListButton(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init();
    }

    public SimpleListButton(Context context) {
        super(context);
        init();
    }

    @LayoutRes
    protected int getLayoutId() {
        return R.layout.custom_recycler_view_layout;
    }

    private void init() {
        final View tabView = LayoutInflater.from(getContext()).inflate(getLayoutId(), this, false);
        //RelativeLayout v = (RelativeLayout) LayoutInflater.from(getContext()).inflate(R.layout.keyboard,null);
        addView(tabView);
    }


}
