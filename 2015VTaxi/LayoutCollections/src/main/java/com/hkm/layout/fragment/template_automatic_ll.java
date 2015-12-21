package com.hkm.layout.fragment;

import android.app.Fragment;
import android.graphics.Point;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ProgressBar;
import android.widget.RelativeLayout;
import android.widget.TableLayout;
import android.widget.TableRow;

import com.hkm.layout.R;
import com.squareup.picasso.MemoryPolicy;
import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.Iterator;

/**
 * Created by hesk on 26/10/15.
 */
public abstract class template_automatic_ll extends Fragment {
    public enum Type {
        TAB, WEB
    }

    public class bind {
        public final static int FULL = 0, HALF = 1;
        public int size;
        public String url;
        public String image;
        public Type mtype;

        public bind(int size, String url, String imageUrl, @Nullable String type) {
            this.size = size;
            this.url = url;
            this.image = imageUrl;
            if (type != null) {
                if (type.equalsIgnoreCase("webpage")) {
                    mtype = Type.WEB;
                }
            } else {
                mtype = Type.TAB;
            }
        }
    }

    protected Point screen_size;
    private int row_height;

    abstract protected void measureScreen();

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        /* Inflate the layout for this fragment */
        View view = inflater.inflate(R.layout.content_load_linear, container, false);
        return view;
    }

    protected TableLayout ll;
    protected ProgressBar mProgress;
    protected ArrayList<bind> list_configuration = new ArrayList<>();

    @Override
    public void onViewCreated(View view, Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        mProgress = (ProgressBar) view.findViewById(R.id.lylib_ui_loading_circle);
        ll = (TableLayout) view.findViewById(R.id.lylib_list_uv);
        measureScreen();
        row_height = (int) ((float) screen_size.x / (float) 2);
        onLoadData(savedInstanceState);
    }

    protected TableRow newTempHolder() {
        TableRow linearLayout_temp = new TableRow(getActivity());
        linearLayout_temp.setLayoutParams(new TableRow.LayoutParams(screen_size.x, row_height));
        return linearLayout_temp;
    }

    protected abstract Picasso getPicassoClient();

    protected ImageView newRelativeLayout(final bind mBind, int size) {
        ImageView imview = new ImageView(getActivity());
        imview.setLayoutParams(new TableRow.LayoutParams(size == bind.HALF ? row_height : screen_size.x, row_height));
        getPicassoClient()
                .load(mBind.image)
                .memoryPolicy(MemoryPolicy.NO_STORE, MemoryPolicy.NO_CACHE)
                .into(imview);
        imview.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                trigger_link(mBind);
            }
        });
        imview.setScaleType(ImageView.ScaleType.CENTER_CROP);
        return imview;
    }

    protected void trigger_link(bind bindobject) {

    }

    abstract protected void onLoadData(Bundle b);

    protected void continueFinalComplete() {
        int sizeNow, index = 0, halfSizeOnHold = 0;
        boolean half_open = false;
        Iterator<bind> loop = list_configuration.iterator();
        TableRow temp_row = newTempHolder();
        while (loop.hasNext()) {
            bind dlp = loop.next();
            sizeNow = dlp.size;
            if (sizeNow == bind.FULL) {
                if (half_open) {
                    //close half
                    ll.addView(temp_row, new TableLayout.LayoutParams(screen_size.x, row_height));
                    half_open = false;
                    halfSizeOnHold = 0;
                }
                ll.addView(newRelativeLayout(dlp, sizeNow));
            } else if (sizeNow == bind.HALF) {
                if (!half_open) {
                    temp_row = newTempHolder();
                    half_open = true;
                }
                halfSizeOnHold++;
                //adding view to layout
                temp_row.addView(newRelativeLayout(dlp, sizeNow));
            }

            if (index == list_configuration.size() - 1 && half_open || half_open && halfSizeOnHold >= 2) {
                ll.addView(temp_row, new TableLayout.LayoutParams(screen_size.x, row_height));
                half_open = false;
                halfSizeOnHold = 0;
            }

            index++;
        }
    }

    protected void onLoadComplete() {
        mProgress.animate().alpha(0f).withEndAction(new Runnable() {
            @Override
            public void run() {
                try {
                    mProgress.setVisibility(View.GONE);
                    continueFinalComplete();
                } catch (Exception e) {
                    Log.d("dialog", e.getMessage());
                }
            }
        });
    }

}
