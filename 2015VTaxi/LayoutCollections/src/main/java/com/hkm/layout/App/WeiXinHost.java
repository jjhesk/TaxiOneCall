package com.hkm.layout.App;

import android.content.Intent;
import android.speech.RecognizerIntent;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.view.View;

import com.hkm.advancedtoolbar.materialsearch.MaterialSearchView;
import com.hkm.layout.App.WeiXinDouble;
import com.hkm.layout.ControllableFrame;
import com.hkm.layout.R;
import com.ogaclejapan.smarttablayout.utils.v13.FragmentPagerItems;

import java.util.ArrayList;

/**
 * Created by hesk on 17/12/15.
 */
public class WeiXinHost<f> extends WeiXinLayout<f> {
    protected ControllableFrame controllingframe;
    protected MaterialSearchView searchView;

    /**
     * the location to setup and configure the toolbar widget under AppCompat V7
     *
     * @param mxToolBarV7 Toolbar object
     */
    @Override
    protected void configToolBar(Toolbar mxToolBarV7) throws NullPointerException {
        searchView = (MaterialSearchView) findViewById(R.id.lylib_search_view);
        searchView.setVoiceSearch(true);
        searchView.setCursorDrawable(R.drawable.color_cursor_white);
        searchView.setSuggestions(getSuggestions());
        searchView.setOnQueryTextListener(new MaterialSearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                //Snackbar.make(findViewById(R.id.container), "Query: " + query, Snackbar.LENGTH_LONG).show();
                searchSubmission(query);
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                //Do some magic
                return false;
            }
        });
    }


    protected void searchSubmission(String query) {
        searchView.setQuery(query, false);
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == MaterialSearchView.REQUEST_VOICE && resultCode == RESULT_OK) {
            ArrayList<String> matches = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
            if (matches != null && matches.size() > 0) {
                String searchWrd = matches.get(0);
                if (!TextUtils.isEmpty(searchWrd)) {
                    searchView.setQuery(searchWrd, false);
                }
            }

            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
    }


    @Override
    public void onBackPressed() {
        if (searchView.isSearchOpen()) {
            searchView.closeSearch();
        } else {
            super.onBackPressed();
        }
    }

    protected String[] getSuggestions() {
        return new String[]{};
    }


    @Override
    protected void onDaPageSelected(int position) {

    }

    @Override
    protected int getDefaultMainActivityLayoutId() {
        if (getStatusBarTranslucentStatus()) {
            return BODY_LAYOUT.weixindualtabhot_trans_status.getResID();
        } else {
            return BODY_LAYOUT.weixindualtabhot_solid_status.getResID();
        }
    }

    /**
     * we do not need this implementation as we do not use viewpage based layout only working for wei xin layout slider. This will not run in the end
     * here to add your menu items in to this adapter;
     *
     * @param creator the creator
     * @return FragmentPagerItems.Creator
     */
    @Override
    protected FragmentPagerItems.Creator addFragmentsToStack(FragmentPagerItems.Creator creator) {
        return null;
    }


    protected int targetHomeFrame() {
        return R.id.lylib_main_frame_body;
    }

    @Override
    protected void afterInitContentViewToolBar() {
        controllingframe = (ControllableFrame) findViewById(targetHomeFrame());
    }

    /**
     * when the fragment is changed now and it will notify the function for user specific operations
     *
     * @param new_fragment_change_now the generic fragment type
     */
    @Override
    protected void notifyOnBodyFragmentChange(f new_fragment_change_now) {
        super.notifyOnBodyFragmentChange(new_fragment_change_now);
        controllingframe = (ControllableFrame) findViewById(targetHomeFrame());
    }


}
