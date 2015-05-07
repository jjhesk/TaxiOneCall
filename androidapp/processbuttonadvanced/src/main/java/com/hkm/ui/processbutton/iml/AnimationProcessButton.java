package com.hkm.ui.processbutton.iml;

import android.content.Context;
import android.graphics.Canvas;
import android.util.AttributeSet;

import com.hkm.ui.processbutton.ProcessButton;

/**
 * Created by hesk on 3/15/2015.
 */
public class AnimationProcessButton extends ProcessButton {
    public AnimationProcessButton(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
    }

    public AnimationProcessButton(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public AnimationProcessButton(Context context) {
        super(context);
    }

    public void setGifFileRes(int resID) {

    }

    public void setGifFile(String filePath) {

    }

    @Override
    public void drawProgress(Canvas canvas) {

    }
}
