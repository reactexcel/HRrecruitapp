package com.hrrecruits;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*; // <-- add this
import android.content.Intent; // <-- and this
import org.devio.rn.splashscreen.SplashScreen;


public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HRrecruit";
    }
    @Override
    protected void onStart() {
        SplashScreen.show(this);  // here
        super.onStart();
        RNBranchModule.initSession(getIntent().getData(), this);
    }
    @Override
    public void onNewIntent(Intent intent) {
        setIntent(intent);
    }
}
