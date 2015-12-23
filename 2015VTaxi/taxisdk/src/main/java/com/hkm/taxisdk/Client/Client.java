package com.hkm.taxisdk.Client;

import android.content.Context;

import com.google.gson.Gson;
import com.squareup.okhttp.Cache;
import com.squareup.okhttp.Interceptor;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import org.xml.sax.ErrorHandler;

import java.io.IOException;
import java.util.Iterator;

/**
 * Created by hesk on 2/7/15.
 */
public abstract class Client {
    public final static String LOG_TAG = "hbsdk.log";
    protected Gson gsonsetup;
    protected Context context;
    protected boolean cache_supported;
    protected Cache mCache;
    protected Interceptor interceptor;

    protected abstract void registerAdapter();

    protected abstract void jsonCreate();

    protected void createInterfaces() {
    }

    public Client(Context context) {
        cache_supported = false;
        this.context = context;
        createIntercept();
        jsonCreate();
        registerAdapter();
        createInterfaces();
    }

    protected void createIntercept() {
        interceptor = new Interceptor() {
            @Override
            public Response intercept(Chain chain) throws IOException {
                Request newRequest = chain.request().newBuilder()
                        .addHeader("User-Agent", "St-Taxi")
                        .addHeader("Accept", "application/json")
                        .build();
                return chain.proceed(newRequest);
            }
        };


    }


    public void removeAllCache() {
        try {
            Iterator<String> it = mCache.urls();
            while (it.hasNext()) {
                String next = it.next();
                it.remove();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void removeFromCache(String urlString) {
        try {
            Iterator<String> it = mCache.urls();
            while (it.hasNext()) {
                String next = it.next();
                if (next.contains(urlString)) {
                    it.remove();
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // tolerate 4-weeks stale
    public static int timeByWeeks(int d) {
        int maxStale = 60 * 60 * 24 * 7 * d;
        return maxStale;
    }

    // read from cache for 1 minute
    public static int timeByMins(int m) {
        int maxStale = 60 * m;
        return maxStale;
    }
}
