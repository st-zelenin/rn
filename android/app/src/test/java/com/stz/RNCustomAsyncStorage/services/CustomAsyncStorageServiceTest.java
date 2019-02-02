package com.stz.RNCustomAsyncStorage.services;

import com.stz.RNCustomAsyncStorage.db.AppDatabase;
import com.stz.RNCustomAsyncStorage.db.StorageItem;
import com.stz.RNCustomAsyncStorage.db.StorageItemDao;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

public class CustomAsyncStorageServiceTest {
    AppDatabase db;
    StorageItemDao storageItemDao;

    private StorageService service;

    @Before
    public void setUp() {
        this.db = Mockito.mock(AppDatabase.class);
        this.storageItemDao = Mockito.mock(StorageItemDao.class);

        when(this.db.storageItemDao()).thenReturn(this.storageItemDao);

        this.service = new CustomAsyncStorageService(db);
    }

    @Test
    public void setItem_insert() {
        ArgumentCaptor<StorageItem> captor = new ArgumentCaptor<StorageItem>();

        this.service.setItem("key1", "value1");

        verify(this.storageItemDao).add(captor.capture());
        StorageItem item = captor.getValue();
        Assert.assertNotNull(item);
        Assert.assertEquals("key1", item.key);
        Assert.assertEquals("value1", item.value);
    }

    @Test
    public void setItem_update() {
        StorageItem existingItem = new StorageItem("key1", "value1");
        ArgumentCaptor<StorageItem> captor = new ArgumentCaptor<StorageItem>();

        when(this.storageItemDao.get(existingItem.key)).thenReturn(existingItem);

        this.service.setItem("key1", "updatedValue");

        verify(this.storageItemDao).update(captor.capture());
        StorageItem item = captor.getValue();
        Assert.assertNotNull(item);
        Assert.assertEquals("key1", item.key);
        Assert.assertEquals("updatedValue", item.value);
    }

    @Test
    public void setMultipleItems_insert() {
        this.service.setMultipleItems(new StorageItem[]{
                new StorageItem("key1", "value1"),
                new StorageItem("key2", "value2"),
        });

        verify(this.storageItemDao, times(1)).addMany(any(StorageItem.class), any(StorageItem.class));
    }

    @Test
    public void setMultipleItems_deleteThenInsert() {
        StorageItem item1 = new StorageItem("key1", "value1");
        StorageItem item2 = new StorageItem("key2", "value2");
        StorageItem[] existingItems = new StorageItem[]{item1, item2};

        when(this.storageItemDao.getMany("key1", "key2")).thenReturn(Arrays.asList(existingItems));

        this.service.setMultipleItems(new StorageItem[]{item1, item2});

        verify(this.storageItemDao, times(1)).getMany("key1", "key2");
        verify(this.storageItemDao, times(1)).deleteMany(item1, item2);

        verify(this.storageItemDao, times(1)).addMany(item1, item2);
    }

    @Test
    public void getItem() {
        StorageItem expectedItem = new StorageItem("key1", "value1");
        when(this.storageItemDao.get(expectedItem.key)).thenReturn(expectedItem);

        StorageItem actualItem = this.service.getItem(expectedItem.key);

        verify(this.storageItemDao, times(1)).get(expectedItem.key);
        Assert.assertNotNull(actualItem);
        Assert.assertEquals(expectedItem, actualItem);
    }

    @Test
    public void getMultipleItems() {
        List<StorageItem> expectedItems = new ArrayList<StorageItem>();
        expectedItems.add(new StorageItem("key1", "value1"));
        expectedItems.add(new StorageItem("key2", "value2"));

        when(this.storageItemDao.getMany("key1", "key2")).thenReturn(expectedItems);


        List<StorageItem> actualItems = this.service.getMultipleItems(new String[]{
                "key1",
                "key2",
        });

        verify(this.storageItemDao, times(1)).getMany("key1", "key2");
        Assert.assertNotNull(actualItems);
        Assert.assertEquals(expectedItems, actualItems);

    }
}