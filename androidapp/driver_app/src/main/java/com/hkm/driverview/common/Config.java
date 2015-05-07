package com.hkm.driverview.common;

import com.hkm.driverview.ListOrderes.OrderCustomer;
import com.hkm.driverview.common.schema.Credential;


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
        public final static String release = "/api/driver/release/";
        public final static String prompt_customer = "/api/driver/prompt_customer/";
        public final static String setdeal = "/api/driver/deal/";
    }

    public static class _default {
        public final static int refresh_time = 10000;
        public final static int refresh_time_customer_prompt = 10000;
        public final static float cameraZoomDefault = 18.0f;

    }

    public static int INTENT_CODE_LOGIN = 10029;
    public static int INTENT_CODE_SINGLE_ORDER = 10030;
    public static OrderCustomer current_view_order;
    public static Credential credential_object;
}
