package com.hrrecruits;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*; // <-- add this
import android.content.Intent; // <-- and this
import org.devio.rn.splashscreen.SplashScreen;
// import android.support.v7.graphics.drawable.DrawableWrapper;


public class MainActivity extends ReactActivity {

    
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    //  @Override
    // public void onActivityResult(int requestCode, int resultCode, Intent data) {
    //     super.onActivityResult(requestCode, resultCode, data);
    //     MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    // }

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
