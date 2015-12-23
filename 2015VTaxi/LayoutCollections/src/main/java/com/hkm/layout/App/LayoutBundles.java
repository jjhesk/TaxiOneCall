package com.hkm.layout.App;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.LayoutRes;
import android.support.v4.view.ViewPager;

import com.hkm.advancedtoolbar.materialsearch.MaterialSearchView;
import com.hkm.layout.ControllableFrame;
import com.hkm.layout.NonSwipe;
import com.hkm.layout.R;
import com.hkm.layout.WeiXinTabHost;
import com.hkm.layout.WeiXinTabLayout;
import com.ogaclejapan.smarttablayout.SmartTabLayout;
import com.ogaclejapan.smarttablayout.utils.v13.FragmentPagerItemAdapter;
import com.ogaclejapan.smarttablayout.utils.v13.FragmentPagerItems;

/**
 * Created by hesk on 21/9/15.
 */
public abstract class LayoutBundles<f> extends fundamental<f> {
    protected NonSwipe mViewPager;
    protected WeiXinTabLayout mSmartTabLayout;
    protected WeiXinTabHost mStartTabHost;
    protected ControllableFrame mExtraFrame;
    protected SmartTabLayout mTabTab;
    protected MaterialSearchView mFixedSearch;
    private int mScrollState;


    // A method to find height of the status bar
    public int getStatusBarHeight() {
        int result = 0;
        if (Build.VERSION.SDK_INT >= 21) {
            int resourceId = getResources().getIdentifier("status_bar_height", "dimen", "android");
            if (resourceId > 0) {
                result = getResources().getDimensionPixelSize(resourceId);
            }
        }
        return result;
    }

    /**
     * on the windowTranslucentStatus is on if it is TRUE
     *
     * @return bool
     */
    public boolean getStatusBarTranslucentStatus() {
        if (Build.VERSION.SDK_INT >= 21) {
            int resourceId = getResources().getIdentifier("windowTranslucentStatus", "boolean", "android");
            if (resourceId > 0) {
                return getResources().getBoolean(resourceId);
            }
        }
        return false;
    }

    private class InternalViewPagerListener implements ViewPager.OnPageChangeListener {

        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
        }

        @Override
        public void onPageSelected(int position) {
            onDaPageSelected(position);
        }

        @Override
        public void onPageScrollStateChanged(int state) {
            mScrollState = state;
        }
    }

    protected abstract void onDaPageSelected(final int position);

    @LayoutRes
    @Override
    protected int getDefaultMainActivityLayoutId() {
        return SimpleLayout.BODY_LAYOUT.weixin.getResID();
    }

    /**
     * only working for wei xin layout slider
     * here to add your menu items in to this adapter;
     *
     * @param creator the creator
     * @return FragmentPagerItems.Creator
     */
    protected abstract FragmentPagerItems.Creator addFragmentsToStack(FragmentPagerItems.Creator creator);

    protected WeiXinTabLayout.ReTouchListener setTabLayoutRetouchListen() {
        return new WeiXinTabLayout.ReTouchListener() {
            @Override
            public void touchItem(int position) {

            }
        };
    }

    protected WeiXinTabHost.ReTouchListener setHostRetouchListner() {
        return new WeiXinTabHost.ReTouchListener() {
            @Override
            public void againTouch(int position) {

            }

            @Override
            public void firstTouch(int position) {

            }
        };
    }

    @Override
    protected void initMainContentFragment(f fragment, Bundle savestate) throws Exception {
        if (getDefaultMainActivityLayoutId() == BODY_LAYOUT.weixindual.getResID()) {
            mViewPager = (NonSwipe) findViewById(R.id.lylib_main_frame_body);
            mSmartTabLayout = (WeiXinTabLayout) findViewById(R.id.lylib_bottom_tab_smart_layout);
            mExtraFrame = (ControllableFrame) findViewById(R.id.lylib_main_frame_body_secondary);
        } else if (getDefaultMainActivityLayoutId() == BODY_LAYOUT.weixindualtabhot_trans_status.getResID()) {
            mStartTabHost = (WeiXinTabHost) findViewById(R.id.lylib_bottom_tab_smart_layout);
        } else if (getDefaultMainActivityLayoutId() == BODY_LAYOUT.weixindualtabhot_solid_status.getResID()) {
            mStartTabHost = (WeiXinTabHost) findViewById(R.id.lylib_bottom_tab_smart_layout);
        } else if (getDefaultMainActivityLayoutId() == BODY_LAYOUT.weixin_solid.getResID()) {
            mSmartTabLayout = (WeiXinTabLayout) findViewById(R.id.lylib_bottom_tab_smart_layout);
            mViewPager = (NonSwipe) findViewById(R.id.lylib_main_frame_body);
        } else if (getDefaultMainActivityLayoutId() == BODY_LAYOUT.tabtranssearchadvanced.getResID() || getDefaultMainActivityLayoutId() == BODY_LAYOUT.tabsolidsearchadvanced.getResID()) {
            mTabTab = (SmartTabLayout) findViewById(R.id.lylib_bottom_tab_smart_layout);
            mFixedSearch = (MaterialSearchView) findViewById(R.id.lylib_search_view);
            mViewPager = (NonSwipe) findViewById(R.id.lylib_main_frame_body);
        }
        if (mTabTab != null && mViewPager != null) {
            FragmentPagerItems mCreate = addFragmentsToStack(FragmentPagerItems.with(this)).create();
            // mSmartTabLayout.setCustomTabView(this);
            FragmentPagerItemAdapter adapter = new FragmentPagerItemAdapter(getFragmentManager(), mCreate);
            mViewPager.setAdapter(adapter);
            mViewPager.setOffscreenPageLimit(4);
            mTabTab.setViewPager(mViewPager);
            mViewPager.addOnPageChangeListener(new InternalViewPagerListener());
        }

        if (mSmartTabLayout != null && mViewPager != null) {
            FragmentPagerItems mCreate = addFragmentsToStack(FragmentPagerItems.with(this)).create();
            // mSmartTabLayout.setCustomTabView(this);
            FragmentPagerItemAdapter adapter = new FragmentPagerItemAdapter(getFragmentManager(), mCreate);
            mViewPager.setAdapter(adapter);
            mViewPager.setOffscreenPageLimit(4);
            mSmartTabLayout.setViewPager(mViewPager);
            mSmartTabLayout.setAnimationOnTabTouch(true);
            mViewPager.addOnPageChangeListener(new InternalViewPagerListener());
            mSmartTabLayout.setRetouchListener(setTabLayoutRetouchListen());
        }

        if (mStartTabHost != null) {
            mStartTabHost.setInitialPosition(0);
            mStartTabHost.setRetouchListener(setHostRetouchListner());
            mStartTabHost.build();
        }
    }

}
