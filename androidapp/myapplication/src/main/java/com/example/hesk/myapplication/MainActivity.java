package com.example.hesk.myapplication;

import android.content.Context;
import android.support.v7.app.ActionBarActivity;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;

import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import com.example.hesk.myapplication.weather.Task;
import com.example.hesk.myapplication.weather.Weather;
import com.pixelad.AdControl;


public class MainActivity extends ActionBarActivity {
    Context ctx;

    private Task mWeather;
    private boolean button_update_enabled = false;

    private void loadLayout() {

        final TextView type = (TextView) findViewById(R.id.weather_type);
        final TextView hum = (TextView) findViewById(R.id.weather_hum);
        final TextView temp = (TextView) findViewById(R.id.weather_temp);
        final TextView uv = (TextView) findViewById(R.id.weather_uv);
        final TextView time = (TextView) findViewById(R.id.weather_time);
        button_update_enabled = true;
        mWeather = new Task(new Weather.weathercb() {
            @Override
            public void display(Weather.WeatherData wd) {
                type.setText("Today: " + wd.weather);
                hum.setText("Humidity: " + wd.humidity);
                temp.setText("Temperature: " + wd.temperature + " C");
                uv.setText("UV: " + wd.uv + "");
                time.setText("latest update: " + wd.dateTime);
                button_update_enabled = true;
            }
        });
        ((Button) findViewById(R.id.updateweather))
                .setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View view) {
                        if (button_update_enabled) {
                            button_update_enabled = false;
                            mWeather.execute();
                        }
                    }
                });
        mWeather.execute();

    }

    public void loadAd() {
        try {
            final AdControl adControl = (AdControl) findViewById(R.id.AdControl);

            adControl.setOnPMAdListener(new AdControl.OnPMAdListener() {
                @Override
                public void onFeedCompleted() {
                    // TODO Auto-generated method stub
                    adControl.log("bannerAd", "onFeedCompleted");
                }

                @Override
                public void onFailedToLoad(Exception exception) {
                    // TODO Auto-generated method stub
                    adControl.log("bannerAd", "onFailedToLoad: " + exception.getMessage());
                }

                @Override
                public void onBrowserClosed() {
                    // TODO Auto-generated method stub
                    adControl.log("bannerAd", "OnBrowserClose");
                }

                @Override
                public void onAdLoadCompleted() {
                    // TODO Auto-generated method stub
                    adControl.log("bannerAd", "OnAdCompleted");
                }
            });

            adControl.setSID("2160324011891");
            // if (true) {
            adControl.initDebug((TextView) findViewById(R.id.timerText), (EditText) findViewById(R.id.debugText));

        } catch (NullPointerException e) {

        }
        //  } else {
        //  ((EditText) findViewById(R.id.debugText)).setVisibility(View.INVISIBLE);
        //   }
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        ctx = this;
        setContentView(R.layout.fragment_main);
        if (savedInstanceState == null) {
          /*  getSupportFragmentManager().beginTransaction()
                    .add(R.id.container, new PlaceholderFragment())
                    .commit();*/

        }
        loadLayout();
        loadAd();
    }


    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.menu_main, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle action bar item clicks here. The action bar will
        // automatically handle clicks on the Home/Up button, so long
        // as you specify a parent activity in AndroidManifest.xml.
        int id = item.getItemId();
        //noinspection SimplifiableIfStatement
        if (id == R.id.action_settings) {
            return true;
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onResume() {
        super.onResume();
        loadAd();
    }

    /**
     * A placeholder fragment containing a simple view.
     */
    public static class PlaceholderFragment extends Fragment {
        private TextView tv;

        public PlaceholderFragment() {
        }


        View rootView;

        @Override
        public View onCreateView(LayoutInflater inflater, ViewGroup container,
                                 Bundle savedInstanceState) {
            rootView = inflater.inflate(R.layout.fragment_main, container, false);
            tv = (TextView) rootView.findViewById(R.id.weather_temp);
            super.onCreateView(inflater, container, savedInstanceState);
            return rootView;
        }

    }
}
