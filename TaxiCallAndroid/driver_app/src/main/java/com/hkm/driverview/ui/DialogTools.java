package com.hkm.driverview.ui;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.graphics.drawable.Drawable;
import android.view.View;
import android.webkit.WebView;
import android.widget.Toast;

import com.afollestad.materialdialogs.GravityEnum;
import com.afollestad.materialdialogs.MaterialDialog;
import com.afollestad.materialdialogs.Theme;
import com.hkm.driverview.R;

/**
 * Created by hesk on 1/11/2015.
 */
public class DialogTools {
    private Context __ctx;
    private ProgressDialog progressBar;


    public DialogTools(Context ctx) {
        __ctx = ctx;
        prepare_progress_bar();
    }
    public void showSimpleMessage(int message) {
        new MaterialDialog.Builder(__ctx)
                .title(android.R.string.dialog_alert_title)
                .content(message)
                .positiveText(android.R.string.ok)
                .forceStacking(true)
                .cancelable(false)
                .show();
    }
    public void showSimpleMessage(String message) {
        new MaterialDialog.Builder(__ctx)
                .title(android.R.string.dialog_alert_title)
                .content(message)
                .positiveText(android.R.string.ok)
                .forceStacking(true)
                .cancelable(false)
                .show();
    }

    public void showSimpleMessage(String message, MaterialDialog.ButtonCallback cb) {
        new MaterialDialog.Builder(__ctx)
                .title(android.R.string.dialog_alert_title)
                .content(message)
                .positiveText(android.R.string.ok)
                .callback(cb)
                .forceStacking(true)
                .cancelable(false)
                .show();
    }

    private void prepare_progress_bar() {
        progressBar = new ProgressDialog(__ctx);
        progressBar.setIndeterminate(true);
        progressBar.setCancelable(false);
        progressBar.setProgressStyle(ProgressDialog.STYLE_SPINNER);
    }


    public void progress_bar_start(final String info) {
       /* runOnUiThread(new Runnable() {
            @Override
            public void run() {*/
        progressBar.setMessage(info);
        progressBar.show();
        /*    }
        });
        */
    }

    public void deal(MaterialDialog.ListCallback cb) {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.deal)
                .items(R.array.time_est)
                .itemsCallback(cb)
                .negativeText(android.R.string.cancel)
                .forceStacking(true)
                .cancelable(false)
                .show();
    }

    public void writeNote(MaterialDialog.ListCallback cb) {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.message_note)
                .items(R.array.complain_list)
                .itemsCallback(cb)
                .negativeText(android.R.string.cancel)
                .forceStacking(true)
                .cancelable(false)
                .show();
    }

    public void progressBarStartCustom() {
        final Drawable n = __ctx.getResources().getDrawable(R.drawable.cooltext1353377076);
        progressBar.setProgressDrawable(n);
        progressBar.show();
    }

    public void progress_bar_start(final int resId) {
        // runOnUiThread(new Runnable() {
        //   @Override
        //     public void run() {
        final String n = __ctx.getResources().getString(resId);
        progressBar.setMessage(n);
        progressBar.show();
        //     }
        // });
    }

    public void progress_bar_dismiss() {
     /*   runOnUiThread(new Runnable() {
            @Override
            public void run() {*/
        if (progressBar.isShowing()) {
            progressBar.dismiss();
        }
        /*    }
        });*/
    }

}
