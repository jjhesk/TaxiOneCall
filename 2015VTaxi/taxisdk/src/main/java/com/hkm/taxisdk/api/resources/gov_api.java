package com.hkm.taxisdk.api.resources;

import com.hkm.taxisdk.api.exception.ApiException;
import com.hkm.taxisdk.api.model.HKGovAddressRes;

import retrofit.Callback;
import retrofit.http.GET;
import retrofit.http.Query;

/**
 * Created by hesk on 23/12/15.
 */
public interface gov_api {
    @GET("/")
    void getAddressQuery(@Query("q") final String query, final Callback<HKGovAddressRes> cb) throws ApiException;
}
