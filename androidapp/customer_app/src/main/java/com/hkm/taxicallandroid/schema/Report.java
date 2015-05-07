package com.hkm.taxicallandroid.schema;

import com.asynhkm.productchecker.Model.gsonModel;

/**
 * Created by hesk on 1/26/2015.
 */
public class Report extends gsonModel {

    private String
            _callId,
            report_issue;

    public Report(String id) {
        _callId = id;
    }

    public void setIssue(String str) {
        report_issue = str;
    }

    public boolean checkComplete() {
        return true;
    }

}
