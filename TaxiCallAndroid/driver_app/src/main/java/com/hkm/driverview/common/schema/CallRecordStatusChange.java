package com.hkm.driverview.common.schema;

import com.hkm.driverview.common.libmodel.gsonModel;

/**
 * Created by hesk on 1/28/2015.
 */
public class CallRecordStatusChange extends gsonModel {
    public String _call_id, driver_num, new_status;

    public CallRecordStatusChange(String orderId, String ddriver_num, String st) {
        _call_id = orderId;
        driver_num = ddriver_num;
        new_status = st;
    }


    @Override
    public boolean checkComplete() {
        return false;
    }
}
