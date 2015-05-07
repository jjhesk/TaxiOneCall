package com.hkm.driverview.managers;

import android.os.Handler;
import android.util.Log;

import java.util.Timer;
import java.util.TimerTask;

/**
 * Created by hesk on 3/15/2015.
 */
public class TimerRequestList {
    private Timer mtimer;
    private final TimerTask doThis;
    private int mperiod = 10000, delay = 0;
    private Handler m_handler = new Handler();
    private Runnable m_handlerTask;

    public static interface cbtask {
        public void exe();
    }

    public TimerRequestList(int period, final cbtask task) {
        mtimer = new Timer();
        // delay for 30 sec.
        m_handlerTask = new Runnable() {
            @Override
            public void run() {
                Log.v("TImer", "repeated");
                task.exe();
            }
        };

        doThis = new TimerTask() {
            public void run() {
                m_handler.post(m_handlerTask);
            }
        };
        mtimer.scheduleAtFixedRate(doThis, delay, period);
        mperiod = period;
    }

    public void pause() {
        mtimer.cancel();
    }

    public void resume() {
        if (mtimer != null) {
            //  mtimer = new Timer();
            //   mtimer.scheduleAtFixedRate(doThis, delay, mperiod);
        }
    }
}
