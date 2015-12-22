package com.hkm.sttaxi;

import com.hkm.layout.App.WeiXinNonSwipFrame;
import com.ogaclejapan.smarttablayout.utils.v13.FragmentPagerItems;

public class MainActivity extends WeiXinNonSwipFrame {

    @Override
    protected void onDaPageSelected(int position) {

    }

    @Override
    protected FragmentPagerItems.Creator addFragmentsToStack(FragmentPagerItems.Creator creator) {
        creator
                .add(R.string.order_now, OrderPhrase.class)
                .add(R.string.login_title, OrderPhrase.class)
        ;
        return creator;
    }


}
