package com.example.hesk.myapplication.pixeldemo;

import android.app.Activity;
import android.net.Uri;
import android.os.Bundle;

import com.pixelad.socialmedia.SocialMediaUtil;

public class TwitterActivity extends Activity {
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Uri uri = getIntent().getData();
        if (uri != null && uri.toString().startsWith(SocialMediaUtil.TWITTER_CALLBACK_URL)) {
        	(new SocialMediaUtil()).setTwitterVerifier(this, uri.getQueryParameter(SocialMediaUtil.URL_PARAMETER_TWITTER_OAUTH_VERIFIER));
        }
        startActivity(SocialMediaUtil.twitterBackIntent);
    }
}