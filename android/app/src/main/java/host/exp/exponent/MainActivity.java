package host.exp.exponent;

import android.app.Application;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.stz.RNNotifications.RNNotificationsModule;
import com.stz.RNNotifications.RNNotificationsPackage;

import org.devio.rn.splashscreen.SplashScreen;

import java.util.List;

import expo.core.interfaces.Package;
import host.exp.exponent.experience.DetachActivity;
import host.exp.exponent.generated.DetachBuildConstants;

public class MainActivity extends DetachActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);

        RNNotificationsPackage notificationsPackage = ((MainApplication) getApplication()).getNotificationsPackage();
        RNNotificationsModule notificationsModule = notificationsPackage.getNotificationsModule();

        notificationsModule.notifyNewIntent(intent.getExtras());
    }

    @Override
    public String publishedUrl() {
        return "exp://exp.host/@st_zelenin/rn";
    }

    @Override
    public String developmentUrl() {
        return DetachBuildConstants.DEVELOPMENT_URL;
    }

    @Override
    public List<ReactPackage> reactPackages() {
        return ((MainApplication) getApplication()).getPackages();
    }

    @Override
    public List<Package> expoPackages() {
        return ((MainApplication) getApplication()).getExpoPackages();
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Override
    public Bundle initialProps(Bundle expBundle) {
        // Add extra initialProps here
        return expBundle;
    }
}
