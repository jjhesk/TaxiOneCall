package com.hkm.taxicallandroid.schema;

import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.content.Context;
import android.content.Intent;
import android.support.v4.app.NotificationCompat;

import com.asynhkm.productchecker.Model.CallTask;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonParseException;
import com.hkm.taxicallandroid.CallPanel;
import com.hkm.taxicallandroid.life.Config;
import com.hkm.taxicallandroid.CommonPack.DialogTools;
import com.hkm.taxicallandroid.R;
import com.hkm.taxicallandroid.ViewBind.IncomingDriver;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.concurrent.ScheduledExecutorService;

/**
 * Created by hesk on 1/21/2015.
 */
public class ConfirmCall {
    public String
            position,
            pickup,
            destination,
            dealstatus,
            calltime,
            calltype,
            callnumber,
            remark_request,
            estimate,
            _id;
    public boolean customer;
    public int passengers;

    private static final String content_f = "Driver %s is coming in %s";

    public static class callconfirm {
        private String _call_id;

        public callconfirm(String id) {
            _call_id = id;
        }
    }

    private static Order_status incoming_driver_data;

    public Order_status getStatusNow() {
        return incoming_driver_data;
    }

    public void check_my_order(final Context ctx, final IncomingDriver controlPanel,final ScheduledExecutorService timer) {
        final String q = Config.domain + Config.control.check;
        String request_body = "";
        final Call check = new Call(ctx, new CallTask.callback() {
            @Override
            public void onSuccess(String data) {
                incoming_driver_data = Order_status.parse(data);
                controlPanel.incoming(timer,incoming_driver_data);
            }

            @Override
            public void onFailure(String message) {

            }

            @Override
            public void beforeStart(CallTask task) {

            }
        });
        check.setDataObject("holder").setBody(consolidate()).setURL(q).execute();
    }

    private void generate_notification(final CallPanel ctx) {

        final NotificationCompat.Builder mBuilder =
                new NotificationCompat.Builder(ctx)
                        .setSmallIcon(R.drawable.ic_talkrequirements)
                        .setContentTitle("Incoming Taxi")
                        .setContentText(String.format(content_f, incoming_driver_data.getLicense(), incoming_driver_data.getEstTime()));
        // Creates an explicit intent for an Activity in your app
        final Intent resultIntent = new Intent(ctx, CallPanel.class);

        // The stack builder object will contain an artificial back stack for the
        // started Activity.
        // This ensures that navigating backward from the Activity leads out of
        // your application to the Home screen.
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(ctx);
        // Adds the back stack for the Intent (but not the Intent itself)
        stackBuilder.addParentStack(CallPanel.class);
        // Adds the Intent that starts the Activity to the top of the stack
        stackBuilder.addNextIntent(resultIntent);
        PendingIntent resultPendingIntent = stackBuilder.getPendingIntent(0, PendingIntent.FLAG_UPDATE_CURRENT);
        mBuilder.setContentIntent(resultPendingIntent);
        NotificationManager mNotificationManager = (NotificationManager) ctx.getSystemService(Context.NOTIFICATION_SERVICE);
        // mId allows you to update the notification later on.
        mNotificationManager.notify(39939, mBuilder.build());

    }

    public void taken(final CallPanel ctx, final DialogTools dt) {

        final quest q = new quest(ctx, new CallTask.callback() {

            @Override
            public void onSuccess(String data) {
                dt.progress_bar_dismiss();
                generate_notification(ctx);
                ctx.finish();
            }

            @Override
            public void onFailure(String message) {
                dt.progress_bar_dismiss();
                dt.showSimpleMessage(message);
            }

            @Override
            public void beforeStart(CallTask task) {
                dt.progress_bar_start(R.string.wait);
            }
        });
        q.setBody(consolidate()).setURL(Config.domain + Config.control.confirm_order).execute();
    }

    public static ConfirmCall parse(final String data) {
        GsonBuilder gb = new GsonBuilder();
        Gson gs = gb.create();
        return gs.fromJson(data, ConfirmCall.class);
    }

    public String consolidate() {
        final callconfirm cf = new callconfirm(_id);
        final GsonBuilder gsonb = new GsonBuilder();
        String request_body = "";
        Gson gson = gsonb.create();
        request_body = gson.toJson(cf);
        return request_body;
    }


    static class quest extends CallTask {
        private static String data_object = "holder";

        public quest(Context ccc, callback cb) {
            super(ccc, cb);
        }

        @Override
        protected void onPostExecute(String resultString) {

            try {
                if (isError) {
                    if (mcallback != null) mcallback.onFailure(errorMessage);
                } else {
                    final JSONObject Jr = new JSONObject(resultString);
                    final String data = Jr.getString(data_object);
                    if (mcallback != null) mcallback.onSuccess(data);
                }
            } catch (JsonParseException e) {
                if (mcallback != null) mcallback.onFailure(e.getMessage());
            } catch (JSONException e) {
                if (mcallback != null) mcallback.onFailure(e.getMessage());
            } catch (NullPointerException e) {
                if (mcallback != null) mcallback.onFailure(e.getMessage());
            } catch (Exception e) {
                if (mcallback != null) mcallback.onFailure(e.getMessage());
            }
        }
    }
}
