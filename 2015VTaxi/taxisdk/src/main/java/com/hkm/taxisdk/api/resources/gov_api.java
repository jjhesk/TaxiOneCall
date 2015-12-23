package com.hkm.taxisdk.api.resources;

import com.hkm.taxisdk.api.exception.ApiException;
import com.hkm.taxisdk.api.model.HKGovAddressRes;

import retrofit.Call;
import retrofit.Callback;
import retrofit.http.GET;
import retrofit.http.Headers;
import retrofit.http.Query;

/**
 * Created by hesk on 23/12/15.
 */
public interface gov_api {
    @Headers({
            "Accept: application/json;charset=UTF-8"
    })
    @GET("/")
    Call<HKGovAddressRes> getAddressQuery(@Query("q") final String query);
}
