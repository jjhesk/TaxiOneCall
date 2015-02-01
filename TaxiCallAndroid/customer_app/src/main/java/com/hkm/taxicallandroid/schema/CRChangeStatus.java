package com.hkm.taxicallandroid.schema;

import com.asynhkm.productchecker.Model.gsonModel;

/**
 * Created by hesk on 2/1/2015.
 */
public class CRChangeStatus extends gsonModel {
    @Override
    public boolean checkComplete() {
        return false;
    }

    public String _callId, new_status;

    public CRChangeStatus(String orderId, String st) {
        _callId = orderId;
        new_status = st;
    }

}
