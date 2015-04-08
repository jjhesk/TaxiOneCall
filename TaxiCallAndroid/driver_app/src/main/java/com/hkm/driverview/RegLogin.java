package com.hkm.driverview;

import android.app.Activity;
import android.os.Bundle;
import android.text.InputType;
import android.view.KeyEvent;
import android.view.View;
import android.view.inputmethod.EditorInfo;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import com.asynhkm.productchecker.Model.CallTask;
import com.daimajia.swipe.SwipeLayout;
import com.hkm.driverview.common.Config;
import com.hkm.driverview.common.Identity;
import com.hkm.driverview.managers.PostD;
import com.hkm.driverview.common.schema.Credential;
import com.hkm.driverview.common.schema.LoginRequest;
import com.hkm.driverview.common.schema.RegistrationRequest;
import com.hkm.driverview.ui.DialogTools;
import com.hkm.ui.processbutton.iml.ActionProcessButton;
import com.parse.ParseAnalytics;

/**
 * Created by hesk on 1/24/2015.
 */
public class RegLogin extends Activity {
    private EditText rloginEmail, rpass, rlicense, rphone, rdrivername, r_name;
    private EditText loginPhone, password;
    private SwipeLayout swipelayout;
    private ActionProcessButton signInButton, register_submission_button;
    private Identity logininfo;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        logininfo = new Identity(this);
        dialog_collection = new DialogTools(this);
        setContentView(R.layout.reglogin);
        setLogin();
        setRegister();
        ParseAnalytics.trackAppOpenedInBackground(getIntent());
    }

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
        r_name = (EditText) findViewById(R.id.r_name);
        rpass.setOnEditorActionListener(reg_bt);
        rloginEmail.setOnEditorActionListener(reg_bt);
        rlicense.setOnEditorActionListener(reg_bt);
        rphone.setOnEditorActionListener(reg_bt);
        swipelayout = (SwipeLayout) findViewById(R.id.swipeloginface);
        register_submission_button = (ActionProcessButton) findViewById(R.id.register_driver);
        register_submission_button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptRegister();
            }
        });
    }

    private void attemptRegister() {
        final RegistrationRequest databome = new RegistrationRequest(
                rloginEmail.getText().toString(),
                rpass.getText().toString(),
                rlicense.getText().toString(),
                r_name.getText().toString(),
                rphone.getText().toString()
        );

        if (databome.checkComplete()) {

            final PostD pp = new PostD(this, new CallTask.callback() {
                @Override
                public void onSuccess(final String data) {
                    //  dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(data);
                    swipelayout.close(true);
                }

                @Override
                public void onFailure(final String message) {
                    //  dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(message);
                }

                @Override
                public void beforeStart(final CallTask task) {
                    //dialog_collection.progress_bar_start(R.string.wait);

                }
            });

            final String Q = Config.domain + Config.control.reg;
            pp.setDataObj("holder").setURL(Q).setBody(databome.toJson()).execute();
        }
    }

    private void attemptLogin() {
        final LoginRequest databome = new LoginRequest(
                loginPhone.getText().toString(),
                password.getText().toString()
        );

        if (databome.checkComplete()) {
            final PostD pp = new PostD(this, new CallTask.callback() {
                @Override
                public void onSuccess(final String data) {
                    signInButton.setProgress(100);
                    //dialog_collection.progress_bar_dismiss();
                    //dialog_collection.showSimpleMessage(data);
                    Credential.parse(data);
                    final String email = Config.credential_object.getEmail();
                    logininfo.saveAuthen(email,
                            databome.pass,
                            databome.login
                    );
                    register_submission_button.setProgress(100);
                    finish();

                }

                @Override
                public void onFailure(final String message) {
                //    dialog_collection.progress_bar_dismiss();
                    dialog_collection.showSimpleMessage(message);
                    signInButton.setProgress(-1);
                    loginPhone.setEnabled(true);
                    password.setEnabled(true);
                    register_submission_button.setEnabled(true);
                    register_submission_button.setProgress(-1);
                }

                @Override
                public void beforeStart(final CallTask task) {
                 //   dialog_collection.progress_bar_start(R.string.wait);
                    signInButton.setProgress(10);
                    loginPhone.setEnabled(false);
                    password.setEnabled(false);
                    register_submission_button.setEnabled(false);
                    register_submission_button.setProgress(10);
                }
            });

            final String Q = Config.domain + Config.control.login;
            pp.setDataObj("holder").setURL(Q).setBody(databome.toJson()).execute();
        } else {
            dialog_collection.showSimpleMessage(R.string.login_incomplete);
        }
        //finish();
    }


    private void setLogin() {
        loginPhone = (EditText) findViewById(R.id.loginEmail);
        password = (EditText) findViewById(R.id.password);
        password.setOnEditorActionListener(edListener);
        signInButton = (ActionProcessButton) findViewById(R.id.sign_in_button);
        signInButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                attemptLogin();
            }
        });
        if (logininfo.hasAuthen()) {
            loginPhone.setText(logininfo.getNumbr());
            password.setInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD);
            password.setText(logininfo.getPass());
        }
    }



}
