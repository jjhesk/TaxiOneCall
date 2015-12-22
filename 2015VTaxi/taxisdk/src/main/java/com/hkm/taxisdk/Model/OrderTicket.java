package com.hkm.taxisdk.Model;

/**
 * Created by hesk on 22/12/15.
 */
public class OrderTicket {
    private long userId;
    private long ticketId;


    public static String
            TAXI_RED = "redtaxi",
            TAXI_GREEN = "greentaxi",
            YELLOW_CAB = "yellow_cab",
            PRIVATE_CAB = "private_car";
    private String
            remarks = "no special requirements",
            cellphone = "",
            gps = "00000,0000",
            type = "",
            destination = "",
            city = "",
            mylocation = "",
            vechicle_type = "";

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getGps() {
        return gps;
    }

    public void setGps(String gps) {
        this.gps = gps;
    }

    public String getMylocation() {
        return mylocation;
    }

    public void setMylocation(String mylocation) {
        this.mylocation = mylocation;
    }

    public String getRemarks() {
        return remarks;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getVechicle_type() {
        return vechicle_type;
    }

    public void setVechicle_type(String vechicle_type) {
        this.vechicle_type = vechicle_type;
    }

    public long getTicketId() {
        return ticketId;
    }

    public void setTicketId(long ticketId) {
        this.ticketId = ticketId;
    }

}
