package com.stz.RNCustomAsyncStorage.services;

import com.google.android.gms.common.util.Strings;
import com.stz.RNCustomAsyncStorage.db.AppDatabase;
import com.stz.RNCustomAsyncStorage.db.StorageItem;

import java.util.ArrayList;
import java.util.List;

public class CustomAsyncStorageService implements StorageService {
    private final AppDatabase db;

    public CustomAsyncStorageService(AppDatabase db) {
        this.db = db;
    }

    @Override
    public void setItem(String key, String value) {
        if (Strings.isEmptyOrWhitespace(key)) {
            throw new IllegalArgumentException("empty key");
        }

        if (Strings.isEmptyOrWhitespace(value)) {
            throw new IllegalArgumentException("empty value");
        }

        StorageItem item = this.db.storageItemDao().get(key);

        if (item == null) {
            this.db.storageItemDao().add(new StorageItem(key, value));
        } else {
            item.value = value;
            this.db.storageItemDao().update(item);
        }
    }

    @Override
    public void setMultipleItems(StorageItem... items) {
        if (items == null || items.length == 0) {
            throw new IllegalArgumentException("empty items");
        }

        ArrayList<String> keys = new ArrayList<String>();
        for (int i = 0; i < items.length; i++) {
            keys.add(items[i].key);
        }

        List<StorageItem> existingItems = this.getMultipleItems(keys.toArray(new String[0]));
        if (existingItems != null && existingItems.size() > 0) {
            this.db.storageItemDao().deleteMany(existingItems.toArray(new StorageItem[0]));
        }

        this.db.storageItemDao().addMany(items);
    }

    @Override
    public StorageItem getItem(String key) {
        if (Strings.isEmptyOrWhitespace(key)) {
            throw new IllegalArgumentException("empty key");
        }

        return this.db.storageItemDao().get(key);
    }

    @Override
    public List<StorageItem> getMultipleItems(String... keys) {
        if (keys == null || keys.length == 0) {
            throw new IllegalArgumentException("empty keys");
        }

        return this.db.storageItemDao().getMany(keys);
    }

    @Override
    public void removeItem(String key) {
        if (Strings.isEmptyOrWhitespace(key)) {
            throw new IllegalArgumentException("empty key");
        }

        this.db.storageItemDao().delete(key);
    }
}
