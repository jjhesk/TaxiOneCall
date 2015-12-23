package com.hkm.taxisdk.api.model.Gov;

import com.google.gson.annotations.SerializedName;

/**
 * Created by hesk on 23/12/15.
 */
public class Street {
    @SerializedName("StreetName")
    public String street_name;
    @SerializedName("BuildingNoFrom")
    public String number;
}
