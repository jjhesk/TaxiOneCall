package com.hkm.driverview.schema;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.hkm.driverview.common.gsonModel;

/**
 * Created by hesk on 1/24/2015.
 */
public class RegistrationRequest extends gsonModel {
    public String
            autotype = "taxi",
            email,
            pass,
            licenseplate,
            name,
            cellphone;

    public RegistrationRequest(
            String qemail,
            String qpass,
            String qlicenseplate,
            String qname,
            String qcellphone
    ) {
        email = qemail;
        pass = qpass;
        name = qname;
        licenseplate = qlicenseplate;
        cellphone = qcellphone;
    }

    public boolean checkComplete() {
        return
                !(email.isEmpty() ||
                        pass.isEmpty() ||
                        name.isEmpty() ||
                        licenseplate.isEmpty() ||
                        cellphone.isEmpty());
    }

}
