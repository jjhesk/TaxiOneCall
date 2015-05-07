package com.hkm.driverview.life.json;

import org.ocpsoft.prettytime.PrettyTime;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by hesk on 1/23/2015.
 */
public class OrderCustomer {
    private int mType = 0;

    public String
            callnumber,
            destination,
            pickup,
            position,
            __v,
            costconfirm,
            _id,
            dealstatus,
            calltime,
            calltype,
            dealstatus_time,
            remark_request;
    public boolean customer;
    public int passengers;

    public static final int TYPE_MESSAGE = 0;
    public static final int TYPE_LOG = 1;
    public static final int TYPE_ACTION = 2;


    private OrderCustomer() {
    }

    public int getType() {
        return mType;
    }


    public static class Builder {
        private final int mType;
        private String mUsername;
        private String mMessage;

        public Builder(int type) {
            mType = type;
        }

        public Builder username(String username) {
            //mUsername = username;
            return this;
        }

        public Builder message(String message) {
            // mMessage = message;
            return this;
        }

        public OrderCustomer build() {
            OrderCustomer message = new OrderCustomer();
            message.mType = mType;
            //  message.callnumber = mUsername;
            //   message.calltype = mMessage;
            return message;
        }
    }

    public String getRemark() {
        return remark_request;
    }

    public String getStatusTime() {
        return dealstatus_time;
    }

    public String getOrderId() {
        return _id;
    }

    public String getCallnumber() {
        return callnumber;
    }

    public String getcalltype() {
        return calltype;
    }

    public String getDestination() {
        return destination;
    }

    public String getPickUp() {
        return pickup;
    }

    public String getMoment() throws ParseException {
        PrettyTime p = new PrettyTime();
        //  SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss z");
        /*SimpleDateFormat dateFormat = new SimpleDateFormat(
                "yyyy-MM-dd hh:mm:ss:SSS");*/
        String ISO_FORMAT1 = "yyyy-MM-dd'T'HH:mm:ss.SSS zzz";
        String ISO_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";
        Date parsedTimeStamp = new SimpleDateFormat(ISO_FORMAT).parse(calltime);
        // Date parsedTimeStamp = formatter.parse(calltime);
        return p.format(parsedTimeStamp);
        //  return calltime;
    }
}
