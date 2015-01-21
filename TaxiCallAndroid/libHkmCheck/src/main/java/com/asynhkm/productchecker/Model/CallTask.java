package com.asynhkm.productchecker.Model;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.util.Log;

import com.asynhkm.productchecker.Checker.CheckerCB;
import com.asynhkm.productchecker.Checker.param;
import com.asynhkm.productchecker.Util.Tool;
import com.squareup.okhttp.MediaType;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.RequestBody;
import com.squareup.okhttp.Response;

import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.HttpConnectionParams;
import org.apache.http.params.HttpParams;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

/**
 * Created by hesk on 1/11/2015.
 */
public class CallTask extends AsyncTask<Void, Void, String> {
    public interface callback {
        public void onSuccess(String data);

        public void onFailure(String message);

        public void beforeStart(CallTask task);
    }

    public boolean isSuccess(String str) throws JSONException {
        final JSONObject js = new JSONObject(str);
        final boolean t = js.getBoolean("success");
        return t;
    }

    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    protected static String TAG = "call.api";
    private Context ctx;
    protected HttpParams httpParams;
    protected OkHttpClient client = new OkHttpClient();
    protected callback mcallback;

    public CallTask(Context ccc, callback cb) {
        httpParams = new BasicHttpParams();
        HttpConnectionParams.setConnectionTimeout(httpParams, 3000);
        HttpConnectionParams.setSoTimeout(httpParams, 5000);
        ctx = ccc;
        mcallback = cb;
    }

    public CallTask setBody(String e) {
        submission_body_json = e;
        return this;
    }

    public CallTask setURL(String e) {
        url = e;
        return this;
    }

    protected boolean isError = false;
    protected String errorMessage, submission_body_json, url;

    private void setError(String e) {
        isError = true;
        errorMessage = e;
    }

    @Override
    protected String doInBackground(Void... params) {
        String out = "";
        try {
            RequestBody body = RequestBody.create(JSON, submission_body_json);
            Request request = new Request.Builder()
                    .url(url)
                    .post(body)
                    .build();
            Response response = client.newCall(request).execute();
            out = response.body().string();
            if (!isSuccess(out)) {
                final JSONObject js = new JSONObject(out);
                final String error_msg = js.getString("message");
                setError(error_msg);
            }
            if (out.equalsIgnoreCase("")) setError("server no response.");
        } catch (NoClassDefFoundError e) {
            setError(e.getMessage());
        } catch (IOException e) {
            Log.d("work ERROR", e.getMessage());
            setError(e.getMessage());
        } catch (Exception e) {
            Log.d("work ERROR", e.getMessage());
            setError(e.getMessage());
        }
        return out;
    }


    @Override
    protected void onPostExecute(String result) {
        Log.d(TAG, "onPostExecute result == " + result);

        if (isError) {
            if (mcallback != null) mcallback.onFailure(errorMessage);
        } else {
            if (mcallback != null) mcallback.onSuccess(result);
        }

        super.onPostExecute(result);
    }

    @Override
    protected void onPreExecute() {
        if (Tool.isOnline(ctx)) {
            super.onPreExecute();
            if (mcallback != null) mcallback.beforeStart(this);
        } else {
            if (mcallback != null) mcallback.onFailure("no internet available");
        }
    }
}
