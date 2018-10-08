package com.hrrecruits;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import cl.json.RNSharePackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import io.branch.rnbranch.RNBranchPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.idehub.GoogleAnalyticsBridge.GoogleAnalyticsBridgePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.apsl.versionnumber.RNVersionNumberPackage;
import io.branch.referral.Branch;
import com.reactnativedocumentpicker.ReactNativeDocumentPicker;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new FIRMessagingPackage(),
            new LinearGradientPackage(),
            new SplashScreenReactPackage(),
            new LinearGradientPackage(),
            new RNSharePackage(),
            new RNFetchBlobPackage(),
            new RNBranchPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
            new GoogleAnalyticsBridgePackage(),
            new RNVersionNumberPackage(),
            new ReactNativeDocumentPicker()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    Branch.getAutoInstance(this);
  }
}
