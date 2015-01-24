package com.hkm.taxicallandroid.memory;

import android.content.Context;
import android.content.SharedPreferences;

import com.hkm.taxicallandroid.schema.DataCallOrder;

/**
 * Created by hesk on 1/25/2015.
 */
public class wordmem {
    public static String
            sharepreferencename_tag = "ONECALLTAXI",
            phonenumber_tag = "PHONENUM";

    public static int hong_kong_number_limit = 8;
    private DataCallOrder mDataCallOrder;
    private Context __ctx;
    private SharedPreferences SP;
    private String
            phonenumber = "",
            productKey = "",
            mac_id = "";
   
    public wordmem(Context c){
        __ctx = c;
    }
    public
}
