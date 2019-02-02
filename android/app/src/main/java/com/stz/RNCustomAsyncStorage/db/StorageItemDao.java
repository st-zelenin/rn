package com.stz.RNCustomAsyncStorage.db;

import android.arch.persistence.room.Dao;
import android.arch.persistence.room.Delete;
import android.arch.persistence.room.Insert;
import android.arch.persistence.room.Query;
import android.arch.persistence.room.Update;

import java.util.List;

@Dao
public interface StorageItemDao {
    @Query("SELECT * FROM storageItems WHERE `key` = :key")
    StorageItem get(String key);

    @Query("SELECT * FROM storageItems WHERE `key` IN (:keys)")
    List<StorageItem> getMany(String... keys);

    @Insert
    void add(StorageItem item);

    @Insert
    void addMany(StorageItem... items);

    @Query("DELETE from storageItems WHERE `key` = :key")
    void delete(String key);

    @Delete
    void deleteMany(StorageItem... items);

    @Update
    void update(StorageItem item);
}
