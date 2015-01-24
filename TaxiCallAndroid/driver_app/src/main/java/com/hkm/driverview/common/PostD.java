package com.hkm.driverview.common;

import android.content.Context;

import com.asynhkm.productchecker.Model.CallTask;
import com.google.gson.JsonParseException;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by hesk on 1/24/2015.
 */
public class PostD extends CallTask {
    public PostD(Context ccc, callback cb) {
        super(ccc, cb);
    }

    private static String data_object = "holder";

    public PostD setDataObj(String str) {
        data_object = str;
        return this;
    }

    @Override
    protected void onPostExecute(String resultString) {
        // super.onPostExecute(resultString);
        try {
            if (isError) {
                if (mcallback != null) mcallback.onFailure(errorMessage);
            } else {
                final JSONObject Jr = new JSONObject(resultString);
                String data = Jr.getString(data_object);
                if (mcallback != null) mcallback.onSuccess(data);
            }
        } catch (JsonParseException e) {
            if (mcallback != null) mcallback.onFailure("JsonParseException:" + e.getMessage());
        } catch (JSONException e) {
            if (mcallback != null) mcallback.onFailure("JSONException:" + e.getMessage());
        } catch (NullPointerException e) {
            if (mcallback != null) mcallback.onFailure("NullPointerException:" + e.getMessage());
        } catch (Exception e) {
            if (mcallback != null) mcallback.onFailure("Exception:" + e.getMessage());
        }
    }
}
