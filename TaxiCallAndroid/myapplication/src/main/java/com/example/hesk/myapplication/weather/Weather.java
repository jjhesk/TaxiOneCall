package com.example.hesk.myapplication.weather;

/**
 * Created by hesk on 13/1/15.
 */

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

public class Weather {
    private static final String ENDPOINT = "http://ec2-54-254-240-178.ap-southeast-1.compute.amazonaws.com/json.php?Date=2015-01-13&Time=11:48&Area=Kwun%20Tong";
    private static final Gson GSON = new Gson();
    private static final TypeToken<List<WeatherData>> CONTRIBUTORS =
            new TypeToken<List<WeatherData>>() {
            };


    public interface weathercb {
        public void display(WeatherData wd);
    }

    private weathercb m_weathercb;

    public static class WeatherData {
        public String weather, dateTime;
        public float temperature, uv;
        public int humidity;
    }

    public Reader main() throws IOException {
        OkHttpClient client = new OkHttpClient();

        // Create request for remote resource.
        Request request = new Request.Builder()

                .url(ENDPOINT)
                .build();

        // Execute the request and retrieve the response.
        Response response = client.newCall(request).execute();

        // Deserialize HTTP response to concrete type.
        Reader body = response.body().charStream();


        return body;


    }

    public Weather(weathercb mweathercb) {
        m_weathercb = mweathercb;
    }
}
