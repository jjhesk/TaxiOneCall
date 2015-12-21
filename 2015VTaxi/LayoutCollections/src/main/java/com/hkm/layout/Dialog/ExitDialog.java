package com.hkm.layout.Dialog;

import android.app.Dialog;
import android.app.DialogFragment;
import android.app.FragmentManager;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import com.hkm.layout.R;

import java.util.Calendar;

/**
 * Created by hesk on 10/11/15.
 */
public class ExitDialog extends DialogFragment {
    private static long last_tap = 0;

    public static boolean Tap(FragmentManager manager, Runnable saverun) {
        long timeNow = Calendar.getInstance().getTimeInMillis();
        final int minDurationBetweenDoubleTap = 500;
        if (last_tap != 0) {
            if (timeNow - last_tap < minDurationBetweenDoubleTap) {
                exitTrigger(manager);
                onclickrun = saverun;
                return true;
            }
        }
        last_tap = timeNow;
        return false;
    }

    private static Runnable onclickrun;

    private static void exitTrigger(FragmentManager manager) {
        ExitDialog.message().show(manager, "exitAlert");
    }


    private static Bundle getMessageBundle() {
        Bundle h = new Bundle();
        h.putInt("message", R.string.exit_alert);
        return h;
    }

    private static ExitDialog message() {
        ExitDialog e = new ExitDialog();
        e.setArguments(getMessageBundle());
        return e;
    }

    protected void onNoticedExitDialog(DialogInterface dialog, int id, String original_message) {


    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        // Use the Builder class for convenient dialog construction
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        final String exitmessage = getResources().getString(getArguments().getInt("message"));
        builder.setMessage(exitmessage)

                .setNegativeButton("Not yet", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })

                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        onNoticedExitDialog(dialog, id, exitmessage);
                        dialog.dismiss();
                        ExitDialog.onclickrun.run();
                    }
                })

                .setCancelable(false)
        ;
        // Create the AlertDialog object and return it
        return builder.create();
    }
}
