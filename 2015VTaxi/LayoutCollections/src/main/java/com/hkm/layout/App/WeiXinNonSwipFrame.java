package com.hkm.layout.App;

import android.app.Fragment;

/**
 * Created by zJJ on 12/23/2015.
 */
public abstract class WeiXinNonSwipFrame extends LayoutBundles<Fragment> {
    @Override
    protected int getDefaultMainActivityLayoutId() {
        if (getStatusBarTranslucentStatus()) {
            return BODY_LAYOUT.weixin.getResID();
        } else {
            return BODY_LAYOUT.weixin_solid.getResID();
        }
    }


}
