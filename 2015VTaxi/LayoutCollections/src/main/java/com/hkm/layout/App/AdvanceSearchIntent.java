package com.hkm.layout.App;

/**
 * Created by hesk on 23/12/15.
 */
public abstract class AdvanceSearchIntent<f> extends LayoutBundles<f> {
    /**
     * setting the default main activity layout ID and this is normally had presented in the library and no need change unless there is a customization need for different layout ID
     *
     * @return resource id
     */
    @Override
    protected int getDefaultMainActivityLayoutId() {
        if (getStatusBarTranslucentStatus()) {
            return BODY_LAYOUT.tabtranssearchadvanced.getResID();
        } else {
            return BODY_LAYOUT.tabsolidsearchadvanced.getResID();
        }
    }


}
