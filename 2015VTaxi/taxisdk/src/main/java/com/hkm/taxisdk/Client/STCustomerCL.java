package com.hkm.taxisdk.Client;

import android.content.Context;
import android.provider.SyncStateContract;

import com.google.gson.GsonBuilder;
import com.hkm.taxisdk.Constants;
import com.hkm.taxisdk.api.gson.GsonFactory;
import com.hkm.taxisdk.api.gson.RealmExclusion;
import com.hkm.taxisdk.api.gson.WordpressConversion;
import com.hkm.taxisdk.api.resources.gov_api;
import com.squareup.okhttp.OkHttpClient;

import retrofit.GsonConverterFactory;
import retrofit.Retrofit;

/**
 * Created by hesk on 23/12/15.
 */
public class STCustomerCL extends Client {
    protected static STCustomerCL static_instance;
    protected Retrofit gov_public_api;

    @Override
    protected void registerAdapter() {


// Add the interceptor to OkHttpClient
        OkHttpClient client = new OkHttpClient();
        client.interceptors().add(interceptor);


        gov_public_api = new Retrofit.Builder()
                .baseUrl(Constants.HKGOV_ADDRESS_QUERY_API)
                .addConverterFactory(GsonConverterFactory.create(gsonsetup))
                .client(client)
                .build();
    }



    public gov_api generateGovApi() {
        return gov_public_api.create(gov_api.class);
    }

    @Override
    protected void jsonCreate() {
        gsonsetup = new GsonBuilder()
                .setDateFormat(Constants.DATE_FORMAT)
                .registerTypeAdapterFactory(new GsonFactory.NullStringToEmptyAdapterFactory())
                .registerTypeAdapter(String.class, new WordpressConversion())
                .setExclusionStrategies(new RealmExclusion())
                .create();
    }


    public STCustomerCL(Context context) {
        super(context);
    }

    public static STCustomerCL newInstance(Context context) {
        return new STCustomerCL(context);
    }

    public static STCustomerCL getInstance(Context context) {
        if (static_instance == null) {
            static_instance = newInstance(context);
            return static_instance;
        } else {
            static_instance.setContext(context);
            return static_instance;
        }
    }

    private void setContext(Context c) {
        this.context = c;
    }

}
