package com.hkm.driverview;

import android.app.Activity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.asynhkm.productchecker.Model.CallTask;
import com.daimajia.swipe.SwipeLayout;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.common.PostD;
import com.hkm.driverview.schema.register;
import com.hkm.driverview.ui.DialogTools;

/**
 * Created by hesk on 1/24/2015.
 */
public class RegLogin extends Activity {
    private EditText rloginEmail, rpass, rlicense, rphone, rdrivername;
    private EditText loginEmail, password;
    private SwipeLayout swipelayout;
    private TextView.OnEditorActionListener edListener = new TextView.OnEditorActionListener() {
        @Override
        public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
            if (id == R.id.login || id == EditorInfo.IME_NULL) {
                attemptLogin();
                return true;
            }
            return false;
        }
    };
    private DialogTools dialog_collection;
    private TextView.OnEditorActionListener reg_bt = new TextView.OnEditorActionListener() {
        @Override
        public boolean onEditorAction(TextView textView, int id, KeyEvent keyEvent) {
            if (id == R.id.register_dr || id == EditorInfo.IME_NULL) {
                attemptRegister();
                return true;
            }
            return false;
        }
    };

    private void setRegister() {
        rloginEmail = (EditText) findViewById(R.id.r_email);
        rpass = (EditText) findViewById(R.id.r_password);
        rlicense = (EditText) findViewById(R.id.r_license_plate);
        rphone = (EditText) findViewById(R.id.r_phone);

        rpass.setOnEditorActionListener(reg_bt);
        rloginEmail.setOnEditorActionListener(reg_bt);
        rlicense.setOnEditorActionListener(reg_bt);
        rphone.setOnEditorActionListener(reg_bt);
        swipelayout = (SwipeLayout) findViewById(R.id.swipeloginface);
        Button signInButton = (Button) findViewById(R.id.register_driver);
        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptRegister();
            }
        });
    }

    private void attemptRegister() {
        final register databome = new register(
                rloginEmail.getText().toString(),
                rpass.getText().toString(),
                rlicense.getText().toString(),
                "DRB" + 488944,
                rphone.getText().toString()
        );

        if (databome.checkComplete()) {

            final PostD pp = new PostD(this, new CallTask.callback() {
                @Override
                public void onSuccess(final String data) {

                    dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(data);
                    swipelayout.close(true);
                }

                @Override
                public void onFailure(final String message) {
                    dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(message);
                }

                @Override
                public void beforeStart(final CallTask task) {
                    dialog_collection.progress_bar_start(R.string.wait);
                }
            });

            final String Q = Config.domain + Config.control.reg;
            pp.setDataObj("holder").setURL(Q).setBody(databome.toJson()).execute();
        }
    }

    private void attemptLogin() {
        final register databome = new register(
                rloginEmail.getText().toString(),
                rpass.getText().toString(),
                rlicense.getText().toString(),
                "DRB" + 488944,
                rphone.getText().toString()
        );

        if (databome.checkComplete()) {
            final PostD pp = new PostD(this, new CallTask.callback() {
                @Override
                public void onSuccess(final String data) {
                    dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(data);
                    swipelayout.close(true);
                }

                @Override
                public void onFailure(final String message) {
                    dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(message);
                }

                @Override
                public void beforeStart(final CallTask task) {
                    dialog_collection.progress_bar_start(R.string.wait);
                }
            });

            final String Q = Config.domain + Config.control.reg;
            pp.setDataObj("holder").setURL(Q).setBody(databome.toJson()).execute();
        }
        finish();
    }

    private Identity logininfo;

    private void setLogin() {
        loginEmail = (EditText) findViewById(R.id.loginEmail);
        password = (EditText) findViewById(R.id.password);
        password.setOnEditorActionListener(edListener);
        Button signInButton = (Button) findViewById(R.id.sign_in_button);
        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });
        logininfo = new Identity(this);
        if (logininfo.hasAuthen()) {
            loginEmail.setText(logininfo.getEmail());
            password.setText(logininfo.getPass());
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        dialog_collection = new DialogTools(this);
        setContentView(R.layout.reglogin);
        setLogin();
        setRegister();
    }


}
