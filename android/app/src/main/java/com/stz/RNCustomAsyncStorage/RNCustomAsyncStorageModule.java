
package com.stz.RNCustomAsyncStorage;

import android.arch.persistence.room.Room;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import static com.facebook.FacebookSdk.getApplicationContext;

public class RNCustomAsyncStorageModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private AppDatabase db;


    public RNCustomAsyncStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.db = Room.databaseBuilder(getApplicationContext(), AppDatabase.class, "custom_async_storage").build();
    }

    @Override
    public String getName() {
        return "RNCustomAsyncStorage";
    }

    @ReactMethod
    public void hello(Callback callback) {
        callback.invoke("hello!1");
    }


    @ReactMethod
    public void setItem(String key, String value, Promise promise) {
        try {
            this.db.storageItemDao().add(new StorageItem(key, value));
            promise.resolve(null);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void getItem(String key, Promise promise) {
        try {
            String value = this.db.storageItemDao().get(key);
            promise.resolve(value);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }
}