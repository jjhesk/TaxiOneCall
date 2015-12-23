package com.hkm.taxisdk.api.model;

import com.google.gson.annotations.SerializedName;
import com.hkm.taxisdk.api.model.Gov.itemSuggestedAddress;
import com.hkm.taxisdk.api.model.Gov.orignalAddressInput;

import java.util.List;

/**
 * Created by hesk on 23/12/15.
 */
public class HKGovAddressRes {

    @SerializedName("SuggestedAddress")
    public List<itemSuggestedAddress> suggestions;

    @SerializedName("RequestAddress")
    public orignalAddressInput input;
}
