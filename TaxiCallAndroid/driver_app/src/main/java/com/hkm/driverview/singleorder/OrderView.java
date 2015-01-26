package com.hkm.driverview.singleorder;

import android.app.Activity;
import android.os.Bundle;

import com.hkm.driverview.R;
import com.hkm.driverview.ui.DialogTools;

/**
 * Created by hesk on 1/25/2015.
 */
public class OrderView extends Activity {

    private DialogTools dialog_collection;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dialog_collection = new DialogTools(this);
        setContentView(R.layout.act_order);
    }
}
