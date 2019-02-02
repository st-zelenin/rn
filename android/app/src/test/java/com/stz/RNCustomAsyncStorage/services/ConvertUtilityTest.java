package com.stz.RNCustomAsyncStorage.services;

import com.stz.RNCustomAsyncStorage.db.StorageItem;

import org.junit.Assert;
import org.junit.Test;

import java.util.ArrayList;

public class ConvertUtilityTest {
    @Test
    public void convertReadableaArrayToStringsArray() {
        ArrayList<Object> arr = new ArrayList<Object>();
        arr.add("a");
        arr.add("b");

        String[] result = ConvertUtility.convertReadableaArrayToStringsArray(arr);
        Assert.assertNotNull(result);
        Assert.assertArrayEquals(new String[]{"a", "b"}, result);
    }

    @Test
    public void convertReadableaArrayToItemsArray() {
        ArrayList<Object> arr = new ArrayList<Object>();
        arr.add(new StorageItem("key1", "value1"));
        arr.add(new StorageItem("key2", "value2"));

        StorageItem[] result = ConvertUtility.convertReadableaArrayToItemsArray(arr);
        Assert.assertNotNull(result);
        Assert.assertEquals(2, result.length);
        Assert.assertEquals("key1", result[0].key);
        Assert.assertEquals("value1", result[0].value);
        Assert.assertEquals("key2", result[1].key);
        Assert.assertEquals("value2", result[1].value);
    }
}