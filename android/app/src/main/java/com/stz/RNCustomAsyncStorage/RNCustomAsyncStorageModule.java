
package com.stz.RNCustomAsyncStorage;

import android.arch.persistence.room.Room;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.stz.RNCustomAsyncStorage.db.AppDatabase;
import com.stz.RNCustomAsyncStorage.db.StorageItem;
import com.stz.RNCustomAsyncStorage.services.ConvertUtility;
import com.stz.RNCustomAsyncStorage.services.CustomAsyncStorageService;
import com.stz.RNCustomAsyncStorage.services.StorageService;

import java.util.List;

import static com.facebook.FacebookSdk.getApplicationContext;

public class RNCustomAsyncStorageModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final StorageService storageService;


    public RNCustomAsyncStorageModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        AppDatabase db = Room.databaseBuilder(getApplicationContext(), AppDatabase.class, "custom_async_storage").build();
        this.storageService = new CustomAsyncStorageService(db);
    }

    @Override
    public String getName() {
        return "RNCustomAsyncStorage";
    }

    @ReactMethod
    public void getItem(String key, Promise promise) {
        try {
            StorageItem item = this.storageService.getItem(key);
            promise.resolve(item.value);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void getMultipleItems(ReadableArray keys, Promise promise) {
        try {
            String[] args = ConvertUtility.convertReadableaArrayToStringsArray(keys.toArrayList());
            List<StorageItem> items = this.storageService.getMultipleItems(args);
            promise.resolve(items);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void setItem(String key, String value, Promise promise) {
        try {
            this.storageService.setItem(key, value);
            promise.resolve(null);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void setMultipleItems(ReadableArray items, Promise promise) {
        try {
            StorageItem[] args = ConvertUtility.convertReadableaArrayToItemsArray(items.toArrayList());
            this.storageService.setMultipleItems(args);
            promise.resolve(null);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

    @ReactMethod
    public void removeItem(String key, Promise promise) {
        try {
            this.storageService.removeItem(key);
            promise.resolve(null);
        } catch (Exception ex) {
            promise.reject(ex);
        }
    }

}
