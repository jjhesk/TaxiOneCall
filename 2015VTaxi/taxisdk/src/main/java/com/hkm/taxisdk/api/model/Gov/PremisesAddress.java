package com.hkm.taxisdk.api.model.Gov;

import com.google.gson.annotations.SerializedName;

/**
 * Created by hesk on 23/12/15.
 */
public class PremisesAddress {
    @SerializedName("EngPremisesAddress")
    public detailAddress english;
    @SerializedName("ChiPremisesAddress")
    public detailAddress chinese;
}
