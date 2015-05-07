package com.hkm.driverview.applicationssmall;

import android.app.Fragment;

import java.lang.reflect.Field;

/**
 * Created by hesk on 7/5/15.
 */
public class Appointments extends APIBaseFragment {
    @Override
    public void onDetach() {
        super.onDetach();
        try {
            Field childFragmentManager = Fragment.class.getDeclaredField("mChildFragmentManager");
            childFragmentManager.setAccessible(true);
            childFragmentManager.set(this, null);
        } catch (NoSuchFieldException e) {
            throw new RuntimeException(e);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void initTimer() {

    }

    @Override
    public void initializeAPI() {

    }
}
