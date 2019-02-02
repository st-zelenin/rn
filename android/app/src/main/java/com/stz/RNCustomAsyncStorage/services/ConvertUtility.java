package com.stz.RNCustomAsyncStorage.services;

import com.stz.RNCustomAsyncStorage.db.StorageItem;

import java.util.ArrayList;

public class ConvertUtility {
    public static String[] convertReadableaArrayToStringsArray(ArrayList<Object> array) {
        return array.toArray(new String[0]);
    }

    public static StorageItem[] convertReadableaArrayToItemsArray(ArrayList<Object> array) {
        return array.toArray(new StorageItem[0]);
    }
}
