package com.hkm.taxicallandroid.CommonPack;

import com.hkm.taxicallandroid.schema.DataCallOrder;

/**
 * Created by hesk on 1/11/2015.
 */
public class Config {
    public static String domain = "http://async777.com";

    public static class control {
        public final static String newcall = "/api/call/new/";
        public final static String login = "/api/account/login/";
        public final static String getcalllist = "/api/call/list/";
    }

    public static DataCallOrder current_order;

    public static class _default {
    }

}
