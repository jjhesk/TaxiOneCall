package com.hkm.layout.Dialog;

import android.app.FragmentManager;
import android.os.Bundle;
import android.util.Log;

import com.hkm.layout.R;

/**
 * Created by hesk on 7/12/15.
 */
public class NoticeMessage extends ErrorMessage {

    public static void alert(final String message, FragmentManager manager) {
        try {
            NoticeMessage.message(message).show(manager, "noticemsg");
        } catch (IllegalStateException e) {
            Log.d("dialog", "illegal state exception");
        } catch (NullPointerException e) {
            Log.d("dialog", "NullPointerException exception");
        } catch (Exception e) {
            Log.d("dialog", "exception" + e.getMessage());
        }


    }

    public static void alert(final String message, FragmentManager manager, Runnable onclickrun) {
        try {
            NoticeMessage.onclickrun = onclickrun;
            NoticeMessage.message(message).show(manager, "noticemsg");
        } catch (IllegalStateException e) {
            Log.d("dialog", "illegal state exception");
        } catch (NullPointerException e) {
            Log.d("dialog", "NullPointerException exception");
        } catch (Exception e) {
            Log.d("dialog", "exception" + e.getMessage());
        }

    }

    public static NoticeMessage message(final String mes) {
        Bundle h = new Bundle();
        h.putString("message", mes);
        NoticeMessage e = new NoticeMessage();
        e.setArguments(h);
        return e;
    }

    @Override
    protected String button_message() {
        return getString(R.string.button_confirm);
    }
}
