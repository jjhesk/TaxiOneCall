package com.hkm.sttaxi;

import android.app.Fragment;

import com.hkm.layout.App.AdvanceSearchIntent;
import com.hkm.sttaxi.pages.ListSearch;
import com.hkm.sttaxi.pages.MapSearch;
import com.ogaclejapan.smarttablayout.utils.v13.FragmentPagerItems;

/**
 * Created by hesk on 23/12/15.
 */
public class LocationApp extends AdvanceSearchIntent<Fragment> {
    @Override
    protected void onDaPageSelected(int position) {

    }

    @Override
    protected FragmentPagerItems.Creator addFragmentsToStack(FragmentPagerItems.Creator creator) {
        creator
                .add(R.string.list_search, ListSearch.class)
                .add(R.string.map_search, MapSearch.class)
        ;
        return creator;
    }
}
