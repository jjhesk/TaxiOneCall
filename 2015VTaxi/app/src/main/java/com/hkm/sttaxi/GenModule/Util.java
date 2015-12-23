package com.hkm.sttaxi.GenModule;

import com.hkm.taxisdk.api.model.Gov.itemSuggestedAddress;
import com.hkm.taxisdk.api.model.HKGovAddressRes;
import com.hkm.taxisdk.api.model.LocationChoice;
import com.hkm.taxisdk.api.model.OrderTicket;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import retrofit.Response;

/**
 * Created by zJJ on 12/22/2015.
 */
public class Util {

    public static OrderTicket newTicket() {
        long range = 1234567L;
        Random r = new Random();
        long number = (long) (r.nextDouble() * range);
        OrderTicket ticket = new OrderTicket();
        ticket.setTicketId(number);
        ticket.setMylocation("");
        List<String> list = new ArrayList<>();
        list.add("");
        list.add("");
        ticket.setDestinations(list);
        return ticket;
    }

    private static LocationChoice withName(String loc) {
        LocationChoice a = new LocationChoice();
        a.setDistrict(loc);
        return a;
    }

    private static LocationChoice resultLevel2(String district, String street) {
        LocationChoice a = new LocationChoice();
        a.setDistrict(district);
        a.setStreets(street);
        return a;
    }

    public static List<LocationChoice> newChoiceStartLv1() {
        List<LocationChoice> list = new ArrayList<>();
        list.add(withName("Hong Kong"));
        list.add(withName("Kowloon"));
        list.add(withName("New Terrorist"));
        return list;
    }

    public static List<LocationChoice> resultFromLevel1(Response<HKGovAddressRes> items) {
        List<LocationChoice> list = new ArrayList<>();
        Iterator<itemSuggestedAddress> it = items.body().suggestions.iterator();
        while (it.hasNext()) {
            itemSuggestedAddress t = it.next();
            list.add(resultLevel2(
                    t.address.address.chinese.chi_district.display_name,
                    t.address.address.chinese.chi_street.street_name));
        }

        return list;
    }
}
