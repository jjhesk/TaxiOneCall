package com.hkm.driverview.ListOrderes;

import android.app.Fragment;
import android.app.FragmentManager;
import android.support.v13.app.FragmentPagerAdapter;

import com.hkm.driverview.applicationssmall.Ocean;

/**
 * Created by hesk on 21/4/15.
 */
public class ViewpagerAdapter extends FragmentPagerAdapter {
    private static int NUM_ITEMS = 2;

    private static int pageNum_1 = 1, pageNum_2 = 1;

    public ViewpagerAdapter(FragmentManager fm) {
        super(fm);
    }

    /**
     * Return the Fragment associated with a specified position.
     *
     * @param position
     */
    @Override
    public Fragment getItem(int position) {
        switch (position) {
            case 0: // Fragment # 0 - This will show FirstFragment
                return new Ocean();
            case 1: // Fragment # 0 - This will show FirstFragment different title
                return new Ocean();
            default:
                return null;
        }
    }

    @Override
    public CharSequence getPageTitle(int position) {
        return "Page " + position;
    }

    /**
     * Return the number of views available.
     */
    @Override
    public int getCount() {
        return NUM_ITEMS;
    }
}
