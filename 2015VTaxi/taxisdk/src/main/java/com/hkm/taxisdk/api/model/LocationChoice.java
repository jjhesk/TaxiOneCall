package com.hkm.taxisdk.api.model;

import android.support.annotation.IntDef;

/**
 * Created by hesk on 23/12/15.
 */
public class LocationChoice {
    public final static int HOTPLACE = 1, LANDMARK = 2, TEMPLE = 3, SHOPPINGMALL = 4, PARK = 5, SWIMMING = 6, SPORT = 7, TRAIL = 8;

    @IntDef({HOTPLACE, LANDMARK, TEMPLE, SHOPPINGMALL, PARK, SWIMMING, SPORT, TRAIL})
    public @interface LocType {
    }

    @LocType
    public int getLocation_type() {
        return location_type;
    }

    public void setLocation_type(@LocType int location_type) {
        this.location_type = location_type;
    }

    public int location_type;


    public String district;

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getStreets() {
        return streets;
    }

    public void setStreets(String streets) {
        this.streets = streets;
    }

    public String streets;
}
