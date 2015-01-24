package com.asynhkm.productchecker.Model;

import android.content.Context;
import android.os.AsyncTask;
import android.util.Log;

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
 * Created by hesk on 1/23/2015.
 */
public class GetTask extends AsyncTask<Void, Void, String> {

    protected boolean isError = false;
    protected String errorMessage, submission_body_json, url;
    public static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
    protected static String TAG = "call.api";
    private Context ctx;
    protected HttpParams httpParams;
    protected OkHttpClient client = new OkHttpClient();
    protected callback mcallback;

    public interface callback {
        public void onSuccess(final String data);
        public void onFailure(final String message);
        public void beforeStart(final GetTask task);
    }

    public boolean isSuccess(String str) throws JSONException {
        final JSONObject js = new JSONObject(str);
        final boolean t = js.getBoolean("success");
        return t;
    }

    public GetTask(Context ccc, callback cb) {
        httpParams = new BasicHttpParams();
        HttpConnectionParams.setConnectionTimeout(httpParams, 3000);
        HttpConnectionParams.setSoTimeout(httpParams, 5000);
        ctx = ccc;
        mcallback = cb;
    }

    public GetTask setURL(String e) {
        url = e;
        return this;
    }

    private void setError(String e) {
        isError = true;
        errorMessage = e;
    }

    @Override
    protected String doInBackground(Void... params) {
        String out = "";
        try {
            Request request = new Request.Builder()
                    .url(url)
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
    protected void onPreExecute() {
        super.onPreExecute();
        if (Tool.isOnline(ctx)) {
            if (mcallback != null) mcallback.beforeStart(this);
        } else {
            //if (mcallback != null) mcallback.onFailure("no internet available");
        }
    }





}
