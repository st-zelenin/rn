package com.stz.RNCustomAsyncStorage;

import android.arch.persistence.room.ColumnInfo;
import android.arch.persistence.room.Entity;
import android.arch.persistence.room.PrimaryKey;
import android.support.annotation.NonNull;

@Entity(tableName = "storageItems")
public class StorageItem {
    public StorageItem() {

    }

    public StorageItem(String key, String value) {
        this.key = key;
        this.value = value;
    }

    @PrimaryKey
    @NonNull
    public String key;

    @ColumnInfo(name = "value")
    public String value;
}
