package com.hkm.taxicallandroid.CommonPack;

import com.hkm.taxicallandroid.schema.DataCallOrder;
import com.hkm.taxicallandroid.schema.Report;

/**
 * Created by hesk on 1/11/2015.
 */
public class Config {
    public static String domain = "http://async777.com";

    public static class control {
        public final static String newcall = "/api/call/new/";
        public final static String login = "/api/account/login/";
        public final static String check = "/api/call/check/";
        public final static String confirm_order = "/api/call/confirm/";
        public final static String report_issue = "/api/call/report/";
    }

    public static DataCallOrder current_order;
    public static Report c_report;
    public static class _default {
        public final static int setlooptimer = 5000;
        public final static int timer = 1000;
        public final static int vibe_length = 1000;
    }

}
