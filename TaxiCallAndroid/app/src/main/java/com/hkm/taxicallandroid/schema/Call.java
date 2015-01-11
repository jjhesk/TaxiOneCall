package com.hkm.taxicallandroid.schema;

import android.content.Context;


import com.asynhkm.productchecker.Model.CallTask;

import com.google.gson.JsonParseException;

import org.json.JSONException;
import org.json.JSONObject;

public class Call extends CallTask {
    private static String data_object = "license_detail";

    public Call(Context ccc, callback cb) {
        super(ccc, cb);
        TAG = "call.api.taxi";
    }

    @Override
    protected void onPostExecute(String resultString) {

        try {
            if (isError) {
                if (mcallback != null) mcallback.onFailure(errorMessage);
            }
            if (isSuccess(resultString)) {
                final JSONObject Jr = new JSONObject(resultString);
                JSONObject data = Jr.getJSONObject(data_object);
                if (mcallback != null) mcallback.onSuccess(data.toString());
            } else {
                if (mcallback != null) mcallback.onFailure(errorMessage);
            }
        } catch (JsonParseException e) {
            if (mcallback != null) mcallback.onSuccess(e.getMessage());
        } catch (JSONException e) {
            if (mcallback != null) mcallback.onSuccess(e.getMessage());
        } catch (NullPointerException e) {
            if (mcallback != null) mcallback.onSuccess(e.getMessage());
        } catch (Exception e) {
            if (mcallback != null) mcallback.onSuccess(e.getMessage());
        }
    }
}
