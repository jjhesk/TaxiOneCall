package com.hkm.taxicallandroid;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.asynhkm.productchecker.Util.Tool;
import com.hkm.taxicallandroid.schema.DataCallOrder;

/**
 * Created by hesk on 1/10/2015.
 */
public class Phone {
    public static String
            sharepreferencename_tag = "ONECALLTAXI",
            phonenumber_tag = "PHONENUM";

    public static int hong_kong_number_limit = 8;
    private DataCallOrder mDataCallOrder;
    private Context _app_context;
    private SharedPreferences SP;
    private String
            phonenumber = "",
            productKey = "",
            mac_id = "";

    public Phone(DataCallOrder m, Context service_context) {
        _app_context = service_context;
        mDataCallOrder = m;
        SP = _app_context.getApplicationContext().getSharedPreferences(Phone.sharepreferencename_tag, Context.MODE_PRIVATE);
        mac_id = Tool.get_mac_address(_app_context);
        phonenumber = SP.getString(Phone.phonenumber_tag, "");

    }

    public interface callback {
        public void phonenumber(String num);
    }

    private void save_number(String num) {
        SP.edit().putString(Phone.phonenumber_tag, num).apply();
        mDataCallOrder.setPhonenumber(num);
    }

    private callback mcall;

    public void resetNumber(callback mcallback) {
        mcall = mcallback;
        phonenumber = "";
        get_agreement();
    }

    private EditText enter_num;
    private View ActionButton;

    private void login() {
        final MaterialDialog m = new MaterialDialog.Builder(_app_context)
                .title(R.string.login_title)
                .customView(R.layout.enter_num, false)
                .negativeText(R.string.login_button_text_face)
                .callback(new MaterialDialog.ButtonCallback() {
                    @Override
                    public void onNegative(MaterialDialog dialog) {
                        super.onNegative(dialog);

                    }
                })
                .cancelable(false)
                .autoDismiss(false)
                .build();

        m.show();

    }

    private void get_agreement() {
        new MaterialDialog.Builder(_app_context)
                .title(R.string.get_number)
                .content(R.string.get_server_number)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .callback(new MaterialDialog.ButtonCallback() {
                    @Override
                    public void onPositive(MaterialDialog dialog) {
                        super.onPositive(dialog);
                        get_number_input();
                    }
                })
                .show();
    }

    private void get_number_input() {
        final MaterialDialog m = new MaterialDialog.Builder(_app_context)
                .title(R.string.login_title)
                .customView(R.layout.enter_num, false)
                .neutralText(R.string.login_button_text_face)
                .callback(new MaterialDialog.ButtonCallback() {
                    @Override
                    public void onNeutral(MaterialDialog dialog) {
                        super.onNeutral(dialog);
                        String num = enter_num.getText().toString();
                        save_number(num);
                        if (mcall != null)
                            mcall.phonenumber(num);
                        dialog.dismiss();
                    }
                })
                .cancelable(false)
                .autoDismiss(false)
                .build();
        ActionButton = m.getActionButton(DialogAction.NEUTRAL);

        enter_num = (EditText) m.getCustomView().findViewById(R.id.enter);
        enter_num.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                //  if (count == Phone.hong_kong_number_limit) {
                ActionButton.setEnabled(s.toString().trim().length() == Phone.hong_kong_number_limit);
                //  }
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        });

        m.show();
        ActionButton.setEnabled(false);

    }

    public void getPhoneNumber() {
        if (!phonenumber.equalsIgnoreCase("")) {
            mDataCallOrder.setPhonenumber(phonenumber);
        } else {
            get_agreement();
        }
    }

    public void setPhoneNumberDisplay(TextView tv) {
        try {
            tv.setText(mDataCallOrder.getnumber());
        } catch (NullPointerException e) {

        }
    }
}
