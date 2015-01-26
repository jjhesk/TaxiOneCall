package com.hkm.driverview.schema;

import com.hkm.driverview.common.gsonModel;

/**
 * Created by hesk on 1/25/2015.
 */
public class DealFace extends gsonModel {
    @Override
    public boolean checkComplete() {
        return false;
    }

    public String _call_id, driver_num, time_est;

    public DealFace() {

    }

    public void setDeal(final String callId,
                        final String drivenum,
                        final String estTime) {
        _call_id = callId;
        driver_num = drivenum;
        time_est = estTime;
    }


}
