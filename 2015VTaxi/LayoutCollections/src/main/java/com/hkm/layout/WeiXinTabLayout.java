package com.hkm.layout;

import android.animation.ArgbEvaluator;
import android.content.Context;
import android.graphics.Canvas;
import android.support.v4.content.ContextCompat;
import android.support.v4.view.PagerAdapter;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.hkm.layout.Menu.Bubble;
import com.hkm.layout.Menu.TabIconView;
import com.hkm.layout.R;

/**
 * Created by wuyexiong on 4/25/15.
 */
public class WeiXinTabLayout extends LinearLayout {

    private ViewPager mViewPager;
    private ViewPager.OnPageChangeListener mViewPagerPageChangeListener;
    private ReTouchListener mReTouch;
    private ArgbEvaluator mColorEvaluator;
    private int mTextNormalColor, mTextSelectedColor;

    private int mLastPosition;
    private int mSelectedPosition;
    private float mSelectionOffset;
    /*
        private String mTitles[] = {"Home", "Categories", "Brand", "Bag", "Me"};
        private int mIconRes[][] = {
                {R.drawable.icon_main_normal_home, R.drawable.icon_main_selected_home},
                {R.drawable.icon_main_normal_grid, R.drawable.icon_main_selected_grid},
                {R.drawable.icon_main_normal_cate, R.drawable.icon_main_selected_cate},
                {R.drawable.icon_main_normal_bag, R.drawable.icon_main_bag_selected},
                {R.drawable.icon_main_normal_account, R.drawable.icon_main_selected_account}
        };
    */
    private String mTitles[] = {"Home", "Categories", "Brand", "Bag", "More"};

    private int mIconRes[][] = {
            {R.drawable.ic_ios_home_unseleced, R.drawable.ic_home_normal_solid},
            {R.drawable.ic_ios_cate_unselected, R.drawable.ic_shirt_normal_solid},
            {R.drawable.ic_brand_unselected_v2, R.drawable.ic_brand_normal_solid},
            {R.drawable.ic_ios_bag_unselected, R.drawable.ic_bag_normal_solid},
            {R.drawable.ic_ios_more_unselected, R.drawable.ic_more_normal_solid}
    };

    private View[] mIconLayouts;
    private TabIconView mViewBubble;

    protected int getAvailableBadgetLocation() {
        return 3;
    }

    public WeiXinTabLayout(Context context) {
        this(context, null);
    }

    public WeiXinTabLayout(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public WeiXinTabLayout(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        init(context, attrs, defStyleAttr);
    }

    private void init(Context context, AttributeSet attrs, int defStyleAttr) {
        mColorEvaluator = new ArgbEvaluator();
        mReTouch = new ReTouchListener() {
            @Override
            public void touchItem(int position) {

            }
        };
        mTextNormalColor = ContextCompat.getColor(context, R.color.theme_inactive);
        mTextSelectedColor = ContextCompat.getColor(context, R.color.theme_active);
    }

    public void setRetouchListener(ReTouchListener ret) {
        this.mReTouch = ret;
    }

    public void setViewPager(ViewPager viewPager) {
        removeAllViews();
        mViewPager = viewPager;
        if (viewPager != null && viewPager.getAdapter() != null) {
            viewPager.addOnPageChangeListener(new InternalViewPagerListener());
            populateTabLayout();
        }
    }

    public void setNotificationNumDisplay(int b) {
        if (mViewBubble != null) {
            mViewBubble.updateBadget(b);
        }
    }

    private void populateTabLayout() {
        final PagerAdapter adapter = mViewPager.getAdapter();
        final OnClickListener tabClickListener = new TabClickListener();
        mIconLayouts = new View[adapter.getCount()];
        for (int i = 0; i < adapter.getCount(); i++) {
            final View tabView = LayoutInflater.from(getContext()).inflate(R.layout.tab_mainbottom, this, false);
            mIconLayouts[i] = tabView;
            TabIconView iconView = (TabIconView) tabView.findViewById(R.id.lylib_main_bottom_tab_icon);

            if (i == getAvailableBadgetLocation()) {
                iconView.addBubble(new Bubble(getContext()));
                mViewBubble = iconView;
            }
            iconView.init(mIconRes[i][0], mIconRes[i][1]);
            TextView textView = (TextView) tabView.findViewById(R.id.lylib_main_bottom_tab_text);
            textView.setText(mTitles[i]);
            if (tabView == null) {
                throw new IllegalStateException("tabView is null.");
            }
            LayoutParams lp = (LayoutParams) tabView.getLayoutParams();
            lp.width = 0;
            lp.weight = 1;
            lp.gravity = Gravity.CENTER_VERTICAL;
            tabView.setOnClickListener(tabClickListener);
            addView(tabView);
            if (i == mViewPager.getCurrentItem()) {
                iconView.transformPage(0);
                tabView.setSelected(true);
                textView.setTextColor(mTextSelectedColor);
            }
        }
    }

    protected void pageSelected(int position) {
        if (mViewPager instanceof NonSwipe) {
            NonSwipe npageer = (NonSwipe) mViewPager;
            npageer.Enabled(position > 0);
        }
    }

    private int mScrollState;

    private class InternalViewPagerListener implements ViewPager.OnPageChangeListener {


        @Override
        public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {
            onViewPagerPageChanged(position, positionOffset);
            if (mViewPagerPageChangeListener != null) {
                mViewPagerPageChangeListener.onPageScrolled(position, positionOffset, positionOffsetPixels);
            }
        }

        @Override
        public void onPageSelected(int position) {
            for (int i = 0; i < getChildCount(); i++) {
                ((TabIconView) mIconLayouts[i].findViewById(R.id.lylib_main_bottom_tab_icon))
                        .transformPage(position == i ? 0 : 1);
                ((TextView) mIconLayouts[i].findViewById(R.id.lylib_main_bottom_tab_text))
                        .setTextColor(position == i ? mTextSelectedColor : mTextNormalColor);
            }
            if (mScrollState == ViewPager.SCROLL_STATE_IDLE) {
                onViewPagerPageChanged(position, 0f);
            }
            for (int i = 0, size = getChildCount(); i < size; i++) {
                getChildAt(i).setSelected(position == i);
            }
            if (mViewPagerPageChangeListener != null) {
                mViewPagerPageChangeListener.onPageSelected(position);
            }
            //additional control for swiping enabling
            //pageSelected(position);
        }

        @Override
        public void onPageScrollStateChanged(int state) {
            mScrollState = state;
            if (mViewPagerPageChangeListener != null) {
                mViewPagerPageChangeListener.onPageScrollStateChanged(state);
            }
        }
    }

    private void onViewPagerPageChanged(int position, float positionOffset) {
        mSelectedPosition = position;
        mSelectionOffset = positionOffset;
        if (positionOffset == 0f && mLastPosition != mSelectedPosition) {
            mLastPosition = mSelectedPosition;
            pageSelected(position);
        }
        invalidate();
    }

    @Override
    protected void onDraw(Canvas canvas) {
        super.onDraw(canvas);
        final int childCount = getChildCount();
        if (childCount > 0) {
            if (mSelectionOffset > 0f && mSelectedPosition < (getChildCount() - 1)) {

                View selectedTab = getChildAt(mSelectedPosition);
                View nextTab = getChildAt(mSelectedPosition + 1);

                View selectedIconView = ((RelativeLayout) selectedTab).getChildAt(0);
                View nextIconView = ((RelativeLayout) nextTab).getChildAt(0);

                View selectedTextView = ((RelativeLayout) selectedTab).getChildAt(1);
                View nextTextView = ((RelativeLayout) nextTab).getChildAt(1);

                //draw icon alpha
                if (selectedIconView instanceof TabIconView && nextIconView instanceof TabIconView) {
                    ((TabIconView) selectedIconView).transformPage(mSelectionOffset);
                    ((TabIconView) nextIconView).transformPage(1 - mSelectionOffset);
                }

                //draw text color
                Integer selectedColor = (Integer) mColorEvaluator.evaluate(mSelectionOffset,
                        mTextSelectedColor,
                        mTextNormalColor);
                Integer nextColor = (Integer) mColorEvaluator.evaluate(1 - mSelectionOffset,
                        mTextSelectedColor,
                        mTextNormalColor);

                if (selectedTextView instanceof TextView && nextTextView instanceof TextView) {
                    ((TextView) selectedTextView).setTextColor(selectedColor);
                    ((TextView) nextTextView).setTextColor(nextColor);
                }
            }
        }
    }

    private boolean tab_click_animation = false;

    public void setAnimationOnTabTouch(boolean b) {
        tab_click_animation = b;
    }

    private class TabClickListener implements OnClickListener {
        @Override
        public void onClick(View v) {
            for (int i = 0; i < getChildCount(); i++) {
                if (v == getChildAt(i)) {
                    mViewPager.setCurrentItem(i, tab_click_animation);
                    if (mReTouch != null && mScrollState == 0) {
                        mReTouch.touchItem(i);
                    }
                    return;
                }
            }
        }
    }


    public interface ReTouchListener {
        /**
         * the is the action trigger when the item is selected again on the same spot
         *
         * @param position the position of the tab
         */
        void touchItem(final int position);
    }

    public void setOnPageChangeListener(ViewPager.OnPageChangeListener listener) {
        mViewPagerPageChangeListener = listener;
    }
}