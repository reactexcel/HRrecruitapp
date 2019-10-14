package com.hrrecruits;

import com.facebook.react.ReactActivity;
import io.branch.rnbranch.*;
import android.content.Intent;
import org.devio.rn.splashscreen.SplashScreen;
// import com.crashlytics.android.Crashlytics;
// import io.fabric.sdk.android.Fabric;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
   @Override
    protected void onStart() {
        super.onStart();
        SplashScreen.show(this);
        RNBranchModule.initSession(getIntent().getData(), this);
        // Crashlytics.getInstance().crash();
    }
 
    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
    }
  @Override
  protected String getMainComponentName() {
    return "hrrecruits";
  }
}
