package com.hkm.driverview.common;

/**
 * Created by hesk on 1/23/2015.
 */
public class Config {
    public static String domain = "http://async777.com";

    public static class control {
        public final static String login = "/api/driver/login/";
        public final static String reg = "/api/driver/new/";
        public final static String getcalllist = "/api/driver/list/";
        public final static String inquiry = "/api/driver/inquiry/";
    }

    public static class _default {
        public final static int refresh_time = 8000;

    }

    public static int INTENT_CODE_LOGIN = 10029;
}
