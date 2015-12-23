package com.hkm.taxisdk.api.model.Gov;

import com.google.gson.annotations.SerializedName;

/**
 * Created by hesk on 23/12/15.
 */
public class detailAddress {
    @SerializedName("Region")
    public String region;
    @SerializedName("BuildingName")
    public String building_name;
    @SerializedName("ChiDistrict")
    public District chi_district;
    @SerializedName("EngDistrict")
    public District eng_district;
    @SerializedName("ChiEstate")
    public Estate chi_estate;
    @SerializedName("EngEstate")
    public Estate eng_estate;
    @SerializedName("ChiStreet")
    public Street chi_street;
    @SerializedName("EngStreet")
    public Street eng_street;
    @SerializedName("ChiBlock")
    public Block chi_block;
    @SerializedName("EngBlock")
    public Block eng_block;
}
