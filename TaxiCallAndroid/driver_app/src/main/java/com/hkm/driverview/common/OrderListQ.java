package com.hkm.driverview.common;

import android.content.Context;

import com.asynhkm.productchecker.Model.CallTask;

import com.asynhkm.productchecker.Model.GetTask;
import com.google.gson.JsonParseException;

import org.json.JSONException;
import org.json.JSONObject;

public class OrderListQ extends GetTask {
    private static String data_object = "holder";

    public OrderListQ(Context ccc, callback cb) {
        super(ccc, cb);
        TAG = "call.api.get_call_list";
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
            if (mcallback != null) mcallback.onFailure("JsonParseException:" +e.getMessage());
        } catch (JSONException e) {
            if (mcallback != null) mcallback.onFailure("JSONException:" + e.getMessage());
        } catch (NullPointerException e) {
            if (mcallback != null) mcallback.onFailure("NullPointerException:" +e.getMessage());
        } catch (Exception e) {
            if (mcallback != null) mcallback.onFailure("Exception:" +e.getMessage());
        }
    }
}
