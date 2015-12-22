package com.hkm.sttaxi;

import android.app.Fragment;

import com.hkm.layout.App.WeiXinDouble;
import com.ogaclejapan.smarttablayout.utils.v13.FragmentPagerItems;

public class MainActivity extends WeiXinDouble<Fragment> {

    @Override
    protected FragmentPagerItems.Creator addFragmentsToStack(FragmentPagerItems.Creator creator) {
        creator
                .add(R.string.order_now, OrderPhrase.class)
                .add(R.string.login_title, OrderPhrase.class)
        ;


        return creator;
    }


}
