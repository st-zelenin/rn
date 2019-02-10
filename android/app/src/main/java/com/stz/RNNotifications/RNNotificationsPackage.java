
package com.stz.RNNotifications;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class RNNotificationsPackage implements ReactPackage {
    private RNNotificationsModule notificationsModule;

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        this.notificationsModule = new RNNotificationsModule(reactContext);
        return Arrays.<NativeModule>asList(this.notificationsModule);
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public RNNotificationsModule getNotificationsModule() {
        return this.notificationsModule;
    }
}
