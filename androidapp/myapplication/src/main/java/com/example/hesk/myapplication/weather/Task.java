package com.example.hesk.myapplication.weather;

import android.os.AsyncTask;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.io.IOException;
import java.io.Reader;

/**
 * Created by hesk on 13/1/15.
 */
public class Task extends AsyncTask<Void, Void, Reader> {
    private Weather rain;
    private Weather.weathercb mweather;

    public Task(Weather.weathercb cb) {
        mweather = cb;
    }

    private String error;

    @Override
    protected Reader doInBackground(Void... voids) {
        Reader d = null;
        try {
            rain = new Weather(mweather);
            d = rain.main();
        } catch (IOException e) {
            // Toast.makeText(this, e.getMessage(), Toast.LENGTH_LONG);
            error = e.getMessage();
        }
        return d;
    }

    @Override
    protected void onPostExecute(Reader body) {
        GsonBuilder gb = new GsonBuilder();
        Gson gg = gb.create();
        if (mweather != null) mweather.display(gg.fromJson(body, Weather.WeatherData.class));
    }
}
