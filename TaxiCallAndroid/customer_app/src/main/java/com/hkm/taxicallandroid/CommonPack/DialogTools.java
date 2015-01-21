package com.hkm.taxicallandroid.CommonPack;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.view.View;
import android.webkit.WebView;
import android.widget.Toast;

import com.afollestad.materialdialogs.GravityEnum;
import com.afollestad.materialdialogs.MaterialDialog;
import com.afollestad.materialdialogs.Theme;
import com.hkm.taxicallandroid.R;

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

    public void showSimpleMessage(String message) {
        new MaterialDialog.Builder(__ctx)
                .title(android.R.string.dialog_alert_title)
                .content(message)
                .positiveText(android.R.string.ok)
                .forceStacking(true)
                .cancelable(false)
                .show();
    }

    public void showStacked() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.speedBoost)
                .negativeText(R.string.noThanks)
                .forceStacking(true)  // this generally should not be forced, but is used for demo purposes
                .show();
    }

    public void showBasic() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .show();
    }

    public void showBasicIcon() {
        new MaterialDialog.Builder(__ctx)
                .iconRes(R.drawable.ic_launcher)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .show();
    }


    private void showNeutral() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .neutralText(R.string.more_info)
                .show();
    }

    private void showCallbacks() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .neutralText(R.string.more_info)
                .callback(new MaterialDialog.ButtonCallback() {
                    @Override
                    public void onPositive(MaterialDialog dialog) {
                        Toast.makeText(__ctx, "Positive!", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onNeutral(MaterialDialog dialog) {
                        Toast.makeText(__ctx, "Neutral", Toast.LENGTH_SHORT).show();
                    }

                    @Override
                    public void onNegative(MaterialDialog dialog) {
                        Toast.makeText(__ctx, "Negative…", Toast.LENGTH_SHORT).show();
                    }
                })
                .show();
    }

    private void showList() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.socialNetworks)
                .items(R.array.socialNetworks)
                .itemsCallback(new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        Toast.makeText(__ctx, which + ": " + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .show();
    }


    private void showListNoTitle() {
        new MaterialDialog.Builder(__ctx)
                .items(R.array.states)
                .itemsCallback(new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        Toast.makeText(__ctx, which + ": " + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .show();
    }

    private void showLongList() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.states)
                .items(R.array.states)
                .itemsCallback(new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        Toast.makeText(__ctx, which + ": " + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .positiveText(android.R.string.ok)
                .show();
    }

    private void showSingleChoice() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.socialNetworks)
                .items(R.array.socialNetworks)
                .itemsCallbackSingleChoice(2, new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        Toast.makeText(__ctx, which + ": " + text, Toast.LENGTH_SHORT).show();
                    }
                })
                .positiveText(R.string.choose)
                .show();
    }

    private void showMultiChoice() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.socialNetworks)
                .items(R.array.socialNetworks)
                .itemsCallbackMultiChoice(new Integer[]{1, 3}, new MaterialDialog.ListCallbackMulti() {
                    @Override
                    public void onSelection(MaterialDialog dialog, Integer[] which, CharSequence[] text) {
                        StringBuilder str = new StringBuilder();
                        for (int i = 0; i < which.length; i++) {
                            str.append(which[i]);
                            str.append(": ");
                            str.append(text[i]);
                            str.append('\n');
                        }
                        Toast.makeText(__ctx, str.toString(), Toast.LENGTH_LONG).show();
                    }
                })
                .positiveText(R.string.choose)

                .show();
    }


    private void showCustomWebView() {
        MaterialDialog dialog = new MaterialDialog.Builder(__ctx)
                .title(R.string.changelog)
                .customView(R.layout.dialog_webview, false)
                .positiveText(android.R.string.ok)
                .build();
        WebView webView = (WebView) dialog.getCustomView().findViewById(R.id.webview);
        webView.loadUrl("file:///android_asset/license.html");
        dialog.show();
    }


    private void showThemed() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .positiveColorRes(R.color.material_red_400)
                .negativeColorRes(R.color.material_red_400)
                .titleGravity(GravityEnum.CENTER)
                .titleColorRes(R.color.material_red_400)
                .contentColorRes(android.R.color.white)
                .backgroundColorRes(R.color.material_blue_grey_800)
                .dividerColorRes(R.color.material_pink_500)
                .theme(Theme.DARK)
                .show();
    }

    private void showShowCancelDismissCallbacks() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.useGoogleLocationServices)
                .content(R.string.useGoogleLocationServicesPrompt)
                .positiveText(R.string.agree)
                .negativeText(R.string.disagree)
                .neutralText(R.string.more_info)
                .showListener(new DialogInterface.OnShowListener() {
                    @Override
                    public void onShow(DialogInterface dialog) {

                        Toast.makeText(__ctx, "onShow", Toast.LENGTH_SHORT).show();
                    }
                })
                .cancelListener(new DialogInterface.OnCancelListener() {
                    @Override
                    public void onCancel(DialogInterface dialog) {
                        Toast.makeText(__ctx, "onCancel", Toast.LENGTH_SHORT).show();
                    }
                })
                .dismissListener(new DialogInterface.OnDismissListener() {
                    @Override
                    public void onDismiss(DialogInterface dialog) {
                        Toast.makeText(__ctx, "onDismiss", Toast.LENGTH_SHORT).show();
                    }
                })
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
        if (progressBar.isShowing()) {
            progressBar.dismiss();
        }
    }

}
