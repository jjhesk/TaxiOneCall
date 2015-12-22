package com.hkm.sttaxi.GenModule;

import com.hkm.taxisdk.Model.OrderTicket;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
}
