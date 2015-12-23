package com.hkm.taxisdk.api.model.Gov;

import com.google.gson.annotations.SerializedName;

/**
 * Created by hesk on 23/12/15.
 */
public class Block {
    @SerializedName("BlockDescriptor")
    public String block_desc;
    @SerializedName("BlockNo")
    public String block_no;
    @SerializedName("BlockDescriptorPrecedenceIndicator")
    public String precedence;
}
