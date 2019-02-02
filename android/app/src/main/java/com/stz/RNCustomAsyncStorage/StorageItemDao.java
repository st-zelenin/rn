package com.stz.RNCustomAsyncStorage;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;

@Dao
public interface StorageItemDao {
    @Query("SELECT value FROM storageItems WHERE `key` = :key")
    String get(String key);

    @Insert
    void add(StorageItem item);

    @Query("DELETE from storageItems WHERE `key` = :key")
    void delete(String key);
}
