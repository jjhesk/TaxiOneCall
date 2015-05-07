package com.hkm.driverview.common.schema;

import com.hkm.driverview.common.libmodel.gsonModel;

/**
 * Created by hesk on 1/25/2015.
 */
public class simpleId extends gsonModel {
    public String _call_id, driver_num;

    public simpleId(String orderId, String ddriver_num) {
        _call_id = orderId;
        driver_num = ddriver_num;
    }


    @Override
    public boolean checkComplete() {
        return false;
    }
}
