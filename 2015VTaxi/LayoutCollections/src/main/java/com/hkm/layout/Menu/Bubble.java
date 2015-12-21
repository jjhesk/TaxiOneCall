package com.hkm.layout.Menu;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.support.annotation.Nullable;

import com.hkm.layout.R;

/**
 * Created by hesk on 22/10/15.
 */
public class Bubble {
    private int width, height, radius, display_number, text_size, x_origin, y_text_origin;
    private Context ctx;
    private Paint mPaint, mTextPaint;

    public Bubble(Context ctx) {
        this.ctx = ctx;
        final Paint mPaint = new Paint(1);
        display_number = 0;
        radius = ctx.getResources().getDimensionPixelOffset(R.dimen.radius_notification_bubble);
        text_size = ctx.getResources().getDimensionPixelSize(R.dimen.text_size_bubble);
        mTextPaint = new Paint();
        mPaint.setColor(Color.RED);
        mPaint.setStyle(Paint.Style.FILL);

        this.mPaint = new Paint(mPaint);
        //   this.mPaint.setStyle(Paint.Style.STROKE);
        //   this.mPaint.setStrokeWidth(2);
        //   this.mPaint.setColor(Color.WHITE);
        mTextPaint.setTextAlign(Paint.Align.CENTER);
        mTextPaint.setColor(Color.WHITE);
        mTextPaint.setStyle(Paint.Style.FILL);
        mTextPaint.setTextSize(text_size);
    }

    public void setRectConfiguration(Rect default_frame) {
        width = default_frame.width();
        height = default_frame.height();
        //  x_origin = width - (int) ((float) radius / (float) 2);
        x_origin = width - radius;
        String XX = "XX";
        final Rect mTextBound = new Rect();
        mTextPaint.getTextBounds(XX, 0, XX.length(), mTextBound);
        y_text_origin = mTextBound.height();
    }

    public void updateNumber(int n) {
        this.display_number = n;
    }

    public void onDraw(Canvas canvas) {
        if (display_number > 0) {
            canvas.drawCircle(x_origin, radius, radius, mPaint);
            canvas.drawText(display_number + "", x_origin, radius + (int) ((float) y_text_origin / (float) 2), mTextPaint);
        }
    }
}
