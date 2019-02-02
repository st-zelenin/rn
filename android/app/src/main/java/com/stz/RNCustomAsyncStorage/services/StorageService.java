package com.stz.RNCustomAsyncStorage.services;

import com.stz.RNCustomAsyncStorage.db.StorageItem;

import java.util.List;

public interface StorageService {
    void setItem(String key, String value);

    void setMultipleItems(StorageItem... items);

    StorageItem getItem(String key);

    List<StorageItem> getMultipleItems(String... keys);

    void removeItem(String key);
}
