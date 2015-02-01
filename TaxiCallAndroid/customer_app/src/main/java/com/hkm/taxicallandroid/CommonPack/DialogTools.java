package com.hkm.taxicallandroid.CommonPack;

import android.app.ProgressDialog;
import android.content.Context;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.webkit.WebView;
import android.widget.EditText;
import android.widget.Toast;

import com.afollestad.materialdialogs.DialogAction;
import com.afollestad.materialdialogs.MaterialDialog;
import com.asynhkm.productchecker.Model.CallTask;
import com.hkm.taxicallandroid.CallPanel;
import com.hkm.taxicallandroid.OrderPanel;
import com.hkm.taxicallandroid.R;
import com.hkm.taxicallandroid.ViewBind.IncomingDriver;
import com.hkm.taxicallandroid.CommonPack.memory.wordmem;
import com.hkm.taxicallandroid.schema.CRChangeStatus;
import com.hkm.taxicallandroid.schema.Call;

/**
 * Created by hesk on 1/11/2015.
 */
public class DialogTools {
    private static String TAG = "dialog_tools";
    private Context __ctx;
    private ProgressDialog progressBar;

    private wordmem wordmemory;

    public DialogTools(Context ctx) {
        __ctx = ctx;
        prepare_progress_bar();
        wordmemory = new wordmem(__ctx);
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
/*
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
    }*/

    private Integer[] add_remarks_selected;

    public void loc_history() {
        if (wordmemory.hasWords()) {
            new MaterialDialog.Builder(__ctx)
                    .title(R.string.prefer_locations)
                    .items(wordmemory.getList())
                    .itemsCallback(new MaterialDialog.ListCallback() {
                        @Override
                        public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                            ((OrderPanel) __ctx).updateLocation(text.toString());
                            dialog.dismiss();
                        }
                    })
                    .positiveText(android.R.string.ok)
                    .show();
        }
    }

    public void pin_azure() {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.prefer_locations)
                .items(R.array.pin)
                .itemsCallback(new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        //Toast.makeText(__ctx, which + ": " + text, Toast.LENGTH_SHORT).show();
                        sub_pin(which);
                    }
                })
                .positiveText(android.R.string.ok)
                .show();
    }

    private int connect_list(int item_in) {
        int array_list = R.array.pin;
        switch (item_in) {
            case 0:
                array_list = R.array.public_hospital;
                break;
            case 1:
                array_list = R.array.airport_locations;
                break;
            case 2:
                array_list = R.array.parks_locations;
                break;
            case 3:
                array_list = R.array.lst_map_c_parks;
                break;
            case 4:
                array_list = R.array.lst_beaches;
                break;
        }
        return array_list;
    }

    private void sub_pin(final int which_map) {
        // Tool.trace(__ctx, which_map + "");
        new MaterialDialog.Builder(__ctx)
                .title(R.string.prefer_locations)
                .items(connect_list(which_map))
                .itemsCallback(new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        ((OrderPanel) __ctx).updateLocation(text.toString());
                        dialog.dismiss();
                    }
                })
                .show();
    }

    public void add_remarks() {
        /* if (add_remarks_selected == null) {
            add_remarks_selected = new Integer[]{-1};
        }*/
        new MaterialDialog.Builder(__ctx)
                .title(R.string.add_on)
                .items(R.array.remarks)
                .itemsCallbackMultiChoice(add_remarks_selected, new MaterialDialog.ListCallbackMulti() {
                    @Override
                    public void onSelection(MaterialDialog dialog, Integer[] which, CharSequence[] text) {
                        StringBuilder str = new StringBuilder();
                        for (int i = 0; i < which.length; i++) {
                            //str.append(which[i]);
                            //str.append(": ");
                            str.append(text[i]);
                            str.append(',');
                            //str.append('\n');
                        }
                        add_remarks_selected = which;
                        ((OrderPanel) __ctx).updateRemark(str.toString());
                        //Tool.trace(__ctx, str.toString());
                    }
                })
                .positiveText(R.string.confirm_choices)
                .show();
    }


    public void showSuggestion(CharSequence[] arraythis) {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.list_suggestion)
                .items(arraythis)
                .itemsCallback(new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog dialog, View view, int which, CharSequence text) {
                        ((OrderPanel) __ctx).updateLocation(text.toString());

                    }
                })
                .positiveText(android.R.string.ok)
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

    public void give_up_prompt() {
        new MaterialDialog.Builder(__ctx)
                .title(android.R.string.dialog_alert_title)
                .content(R.string.get_server_number)
                .callback(new MaterialDialog.Callback() {
                    @Override
                    public void onNegative(MaterialDialog materialDialog) {
                        materialDialog.dismiss();
                    }

                    @Override
                    public void onPositive(MaterialDialog materialDialog) {
                        Config.c_report.setIssue("time out from waiting for the taxi.");
                        report_submission();
                        materialDialog.dismiss();
                    }
                })
                .negativeText(android.R.string.cancel)
                .positiveText(android.R.string.ok)
                .autoDismiss(false)
                .show();
    }

    public void reject_call(final IncomingDriver callbackkstack) {
        new MaterialDialog.Builder(__ctx)
                .title(R.string.report_issue)
                .items(R.array.rejection_reasons)
                .itemsCallbackSingleChoice(-1, new MaterialDialog.ListCallback() {
                    @Override
                    public void onSelection(MaterialDialog materialDialog, View view, int i, CharSequence charSequence) {
                        if (i == -1) {
                            materialDialog.dismiss();
                        } else if (i < 4) {
                            Config.c_report.setIssue(charSequence.toString());
                            report_submission();
                            materialDialog.dismiss();
                        } else {
                            materialDialog.dismiss();
                            write_note(callbackkstack);
                        }
                        Log.d(TAG, i + "");
                    }
                })

                .negativeText(android.R.string.cancel)
                .positiveText(android.R.string.ok)
                .autoDismiss(false)
                .show();
    }


    private EditText note_paper;
    private View ActionButton;

    private void write_note(final IncomingDriver callbackkstack) {
        final MaterialDialog m = new MaterialDialog.Builder(__ctx)
                .title(R.string.report_issue)
                .customView(R.layout.issue_report, false)
                .neutralText(R.string.report_issue)
                .negativeText(android.R.string.cancel)
                .callback(new MaterialDialog.ButtonCallback() {
                    @Override
                    public void onNeutral(MaterialDialog dialog) {
                        super.onNeutral(dialog);
                        String report_content = note_paper.getText().toString();
                        Config.c_report.setIssue(report_content);
                        report_submission();
                        dialog.dismiss();
                    }

                    @Override
                    public void onNegative(MaterialDialog dialog) {
                        super.onNegative(dialog);
                        dialog.dismiss();
                    }
                })
                .cancelable(false)
                .autoDismiss(false)
                .build();
        ActionButton = m.getActionButton(DialogAction.NEUTRAL);

        note_paper = (EditText) m.getCustomView().findViewById(R.id.enter);
        note_paper.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                ActionButton.setEnabled(s.toString().trim().length() > 10);
            }

            @Override
            public void afterTextChanged(Editable s) {
            }
        });

        m.show();
        ActionButton.setEnabled(false);

    }

    private void report_submission() {
        final String q = Config.domain + Config.control.report_issue;
        final Call check = new Call(__ctx, new CallTask.callback() {
            @Override
            public void onSuccess(String data) {
                progress_bar_dismiss();
                ((CallPanel) __ctx).finish();
            }

            @Override
            public void onFailure(String message) {
                progress_bar_dismiss();
            }

            @Override
            public void beforeStart(CallTask task) {
                progress_bar_start(R.string.wait);
            }
        });
        check.setDataObject("holder").setBody(Config.c_report.toJson()).setURL(q).execute();
    }

/*
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
    }*/
/*

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
*/


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
