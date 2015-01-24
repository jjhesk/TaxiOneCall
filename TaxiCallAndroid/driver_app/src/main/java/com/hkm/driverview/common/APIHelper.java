package com.hkm.driverview.common;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.support.v4.content.LocalBroadcastManager;
import android.util.Log;

public class APIHelper {

    //TODO: alert if connectivity lost and call queued

    public static final String EXTRA_MESSAGE = "extraMessage";
    public static final String EXTRA_JSON = "extraJson";

    public static final String MSG_SUCCESS = "msgSuccess";
    public static final String MSG_NO_CONNECTIVITY = "msgNoConnectivity";
    public static final String MSG_HTTP_FAILURE = "msgHttpFailure";
    public static final String MSG_API_FAILURE = "msgApiFailure";
    public static final String MSG_JSON_FAILURE = "msgJsonFailure";

    public static JSONObject sJsonResult = null;

    private static final String LOG_TAG = "APIHelper";

    private static final int TYPE_GET = 301;
    private static final int TYPE_POST = 302;
    private static final int TYPE_PUT = 303;
    private static final int TYPE_DELETE = 304;

    private static ArrayList<APICall> mQueuedApiCalls = null;

    /**
     * GETs to a URL and broadcasts an event on result.
     * @param context
     * @param filterName - intent filter
     * @param urlStr
     * @param params
     */
    public static void apiGet(	Context context,
                                  String filterName,
                                  String urlStr,
                                  ArrayList<NameValuePair> params,
                                  boolean doQueueIfBlocked) {

        if(!NetworkStatusHelper.isNetworkConnected(context)) {
            handleNoConnectivity(TYPE_GET, context, filterName, urlStr, params, doQueueIfBlocked);
            return;
        }

        InputStream inputStream = null;
        String result = null;
        JSONObject jsonObject = null;

        // create parameter string
        String paramStr = URLEncodedUtils.format(params, "utf-8");
        urlStr += "?"+paramStr;

        // http get
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpGet httpGet = new HttpGet(urlStr);
            HttpResponse httpResponse = httpClient.execute(httpGet);
            HttpEntity httpEntity = httpResponse.getEntity();

            inputStream = httpEntity.getContent();

			/* FOR FUTURE USE */
            //int statusCode = httpResponse.getStatusLine().getStatusCode();
        } catch(Exception e) {
            handleHttpError(context, filterName, e);
            return;
        }

        result = getStringFromResponse(inputStream);

        if(result == null) {
            sendMessage(context, filterName, MSG_API_FAILURE, null);
            return;
        }
        jsonObject = getJsonFromString(result);

        if(jsonObject != null) {
            sendMessage(context, filterName, MSG_SUCCESS, result);
        } else {
            sendMessage(context, filterName, MSG_JSON_FAILURE, null);
        }
    }

    /**
     * POSTs to a URL and broadcasts an event on result.
     * @param context
     * @param filterName
     * @param urlStr
     * @param params
     */
    public static void apiPost(	Context context,
                                   String filterName,
                                   String urlStr,
                                   ArrayList<NameValuePair> params,
                                   boolean doQueueIfBlocked) {

        if(!NetworkStatusHelper.isNetworkConnected(context)) {
            handleNoConnectivity(TYPE_POST, context, filterName, urlStr, params, doQueueIfBlocked);
            return;
        }

        InputStream inputStream = null;
        String result = null;
        JSONObject jsonObject = null;

        // http post
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpPost httpPost = new HttpPost(urlStr);
            httpPost.setEntity(new UrlEncodedFormEntity(params));
            HttpResponse httpResponse = httpClient.execute(httpPost);
            HttpEntity httpEntity = httpResponse.getEntity();

            inputStream = httpEntity.getContent();

			/* FOR FUTURE USE */
            //int statusCode = httpResponse.getStatusLine().getStatusCode();
        } catch(Exception e) {
            handleHttpError(context, filterName, e);
            return;
        }

        result = getStringFromResponse(inputStream);

        if(result == null) {
            sendMessage(context, filterName, MSG_API_FAILURE, null);
            return;
        }

        jsonObject = getJsonFromString(result);

        if(jsonObject != null) {
            sJsonResult = jsonObject;
            sendMessage(context, filterName, MSG_SUCCESS, result);
        } else {
            sendMessage(context, filterName, MSG_JSON_FAILURE, null);
        }
    }

    /**
     * PUTs to a URL and broadcasts an event on result.
     * @param context
     * @param filterName
     * @param urlStr
     * @param params
     */
    public static void apiPut(	Context context,
                                  String filterName,
                                  String urlStr,
                                  ArrayList<NameValuePair> params,
                                  boolean doQueueIfBlocked) {

        if(!NetworkStatusHelper.isNetworkConnected(context)) {
            handleNoConnectivity(TYPE_PUT, context, filterName, urlStr, params, doQueueIfBlocked);
            return;
        }

        InputStream inputStream = null;
        String result = null;
        JSONObject jsonObject = null;

        // http put
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpPut httpPut = new HttpPut(urlStr);
            httpPut.setEntity(new UrlEncodedFormEntity(params));
            HttpResponse httpResponse = httpClient.execute(httpPut);
            HttpEntity httpEntity = httpResponse.getEntity();

            inputStream = httpEntity.getContent();

			/* FOR FUTURE USE */
            //int statusCode = httpResponse.getStatusLine().getStatusCode();
        } catch(Exception e) {
            handleHttpError(context, filterName, e);
            return;
        }

        result = getStringFromResponse(inputStream);

        if(result == null) {
            sendMessage(context, filterName, MSG_API_FAILURE, null);
            return;
        }

        jsonObject = getJsonFromString(result);

        if(jsonObject != null) {
            sJsonResult = jsonObject;
            sendMessage(context, filterName, MSG_SUCCESS, result);
        } else {
            sendMessage(context, filterName, MSG_JSON_FAILURE, null);
        }
    }

    /**
     * DELETEs to a URL and broadcasts an event on result.
     * @param context
     * @param filterName
     * @param urlStr
     * @param params
     */
    public static void apiDelete(	Context context,
                                     String filterName,
                                     String urlStr,
                                     ArrayList<NameValuePair> params,
                                     boolean doQueueIfBlocked) {

        if(!NetworkStatusHelper.isNetworkConnected(context)) {
            handleNoConnectivity(TYPE_DELETE, context, filterName, urlStr, params, doQueueIfBlocked);
            return;
        }

        InputStream inputStream = null;
        String result = null;
        JSONObject jsonObject = null;

        // http delete
        try {
            HttpClient httpClient = new DefaultHttpClient();
            HttpDelete httpDelete = new HttpDelete(urlStr);
            HttpResponse httpResponse = httpClient.execute(httpDelete);
            HttpEntity httpEntity = httpResponse.getEntity();

            inputStream = httpEntity.getContent();

			/* FOR FUTURE USE */
            //int statusCode = httpResponse.getStatusLine().getStatusCode();
        } catch(Exception e) {
            handleHttpError(context, filterName, e);
            return;
        }

        result = getStringFromResponse(inputStream);

        if(result == null) {
            sendMessage(context, filterName, MSG_API_FAILURE, null);
            return;
        }

        jsonObject = getJsonFromString(result);

        if(jsonObject != null) {
            sJsonResult = jsonObject;
            sendMessage(context, filterName, MSG_SUCCESS, result);
        } else {
            sendMessage(context, filterName, MSG_JSON_FAILURE, null);
        }
    }

    /**
     * Iterates through and runs queued API calls.
     */
    public static void runQueue() {
        if(mQueuedApiCalls != null && mQueuedApiCalls.size() > 0) {
            for(APICall apiCall : mQueuedApiCalls) {
                if(NetworkStatusHelper.isNetworkConnected) {
                    switch(apiCall.callType) {

                        case TYPE_GET:
                            apiGet(apiCall.context, apiCall.filterName, apiCall.urlStr, apiCall.params, true);
                            break;

                        case TYPE_POST:
                            apiPost(apiCall.context, apiCall.filterName, apiCall.urlStr, apiCall.params, true);
                            break;

                        case TYPE_PUT:
                            apiPut(apiCall.context, apiCall.filterName, apiCall.urlStr, apiCall.params, true);
                            break;

                        case TYPE_DELETE:
                            apiDelete(apiCall.context, apiCall.filterName, apiCall.urlStr, apiCall.params, true);
                            break;

                    }

                    mQueuedApiCalls.remove(apiCall);
                } else {
                    break;
                }
            }

            //TODO: timeout between each call?

            if(mQueuedApiCalls.size() == 0) {
                mQueuedApiCalls = null;
            }
        }
    }

    public static void pauseQueue() {

    }

    /**
     * Converts and returns String from API response.
     * @param inputStream
     * @return
     */
    private static String getStringFromResponse(InputStream inputStream) {
        try {
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "iso-8859-1"),8);
            StringBuilder stringBuilder = new StringBuilder();
            String line = null;

            while((line = bufferedReader.readLine()) != null) {
                stringBuilder.append(line+"\n");
            }
            inputStream.close();

            return stringBuilder.toString();
        } catch(Exception e) {
            Log.d(LOG_TAG, "Error converting result " + e.toString());
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Converts and returns JSONObject from String.
     * @param str
     * @return
     */
    public static JSONObject getJsonFromString(String str) {
        Log.d(LOG_TAG, str);
        JSONObject jsonObject = null;

        try {
            jsonObject = new JSONObject(str);
            return jsonObject;
        } catch(JSONException e) {
            Log.d(LOG_TAG, "Error parsing data " + e.toString());
            e.printStackTrace();
            return null;
        }
    }

    private static void handleNoConnectivity(	int callType,
                                                 Context context,
                                                 String filterName,
                                                 String urlStr,
                                                 ArrayList<NameValuePair> params,
                                                 boolean doQueueIfBlocked) {
        Log.d(LOG_TAG,"No connection found");
        if(doQueueIfBlocked) {
            addApiCallToQueue(callType, context, filterName, urlStr, params);
        }
        sendMessage(context, filterName, MSG_NO_CONNECTIVITY, null);
    }

    /**
     *
     * @param context
     * @param filterName
     * @param e
     */
    private static void handleHttpError(Context context, String filterName, Exception e) {
        Log.d(LOG_TAG,"Error in http connection " + e.toString());
        e.printStackTrace();
        sendMessage(context, filterName, MSG_HTTP_FAILURE, null);
    }

    /**
     * Broadcasts event.
     * @param context
     * @param msg
     * @param value
     */
    private static void sendMessage(Context context, String filterName, String msg, String jsonStr) {
        Intent intent = new Intent(filterName);
        intent.putExtra(EXTRA_MESSAGE, msg);
        intent.putExtra(EXTRA_JSON, jsonStr);

        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }

    /**
     * Adds an API call to the queue.
     * @param callType
     * @param context
     * @param filterName
     * @param msg
     */
    private static void addApiCallToQueue(int callType, Context context, String filterName, String urlStr, ArrayList<NameValuePair> params) {
        if(mQueuedApiCalls == null) {
            mQueuedApiCalls = new ArrayList<APICall>();
        }

        mQueuedApiCalls.add(new APICall(callType, context, filterName, urlStr, params));
    }

    @SuppressWarnings("unused")
    private static class APICall {

        public int callType = 0;
        public Context context = null;
        public String filterName = null;
        public String urlStr = null;
        public ArrayList<NameValuePair> params = null;

        public APICall(int callType, Context context, String filterName, String urlStr, ArrayList<NameValuePair> params) {
            this.callType = callType;
            this.context = context;
            this.filterName = filterName;
            this.urlStr = urlStr;
            this.params = params;
        }

    }

}