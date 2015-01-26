package com.hkm.taxicallandroid.memory;

import android.content.Context;
import android.content.SharedPreferences;

import com.asynhkm.productchecker.Util.Tool;
import com.hkm.taxicallandroid.schema.DataCallOrder;

/**
 * Created by hesk on 1/25/2015.
 */
public class wordmem {
    public static String
            sharepreferencename_tag = "ONECALLTAXI",
            wordbank = "WORDBANK";

    public static int hong_kong_number_limit = 8;
    private DataCallOrder mDataCallOrder;
    private Context __ctx;
    private SharedPreferences SP;
    private String
            wordaddress = "",
            productKey = "";


    public wordmem(Context c) {
        __ctx = c;
        SP = __ctx.getApplicationContext().getSharedPreferences(wordmem.sharepreferencename_tag, Context.MODE_PRIVATE);
        wordaddress = SP.getString(wordmem.wordbank, "");
    }

    public boolean hasWords() {
        return !wordaddress.isEmpty();
    }

    public String[] getList() {
        if (wordaddress.isEmpty()) {
            return new String[0];
        } else {
            return wordaddress.split(",");
        }
    }

    public void clearbank() {
        SP.edit().putString(wordmem.wordbank, "").apply();
    }

    public void addWord(String word) {
        if (wordaddress.isEmpty()) {
            wordaddress = word;
        } else {
            wordaddress = wordaddress + "," + word;
        }
        SP.edit().putString(wordmem.wordbank, wordaddress).apply();
    }
}
