package com.stz.RNNotifications;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.stz.RNNotifications.services.NotificationID;

import host.exp.exponent.MainActivity;

public class RNNotificationsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final String channelId = "com.stz.rnnotifications";
    private final String notificationIdExtraKey = "notificationId";
    private NotificationManager notificationManager;

    public RNNotificationsModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "RNNotifications";
    }

    @ReactMethod
    public void init() {
        this.notificationManager = (NotificationManager) reactContext.getSystemService(Context.NOTIFICATION_SERVICE);

        NotificationChannel channel = new NotificationChannel(this.channelId, "Friday's shop notifications",
                NotificationManager.IMPORTANCE_LOW);

        channel.setDescription("Notifications channel for the Friday's shop");
        channel.enableVibration(true);

        notificationManager.createNotificationChannel(channel);
    }

    @ReactMethod
    public void notify(String title, String message, Callback callback) {
        int notificationId = NotificationID.getID();

        Notification notification = new Notification.Builder(this.reactContext)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setChannelId(this.channelId)
                .setContentIntent(this.createPendingIntent(notificationId))
                .build();

        this.notificationManager.notify(notificationId, notification);

        callback.invoke(notificationId);
    }

    @ReactMethod
    public void update(int notificationId, String title, String message) {
        Notification notification = new Notification.Builder(this.reactContext)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setChannelId(this.channelId)
                .setContentIntent(this.createPendingIntent(notificationId))
                .build();

        notificationManager.notify(notificationId, notification);
    }

    @ReactMethod
    public void remove(int notificationId) {
        this.notificationManager.cancel(notificationId);
    }

    public void notifyNewIntent(Bundle extras) {
        int notificationId = 0;
        if (extras != null) {
            notificationId = extras.getInt(this.notificationIdExtraKey);
        }

        this.reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("notificationClicked", notificationId);
    }

    private PendingIntent createPendingIntent(int notificationId) {
        Intent intent = new Intent(this.reactContext, MainActivity.class);
        intent.putExtra(this.notificationIdExtraKey, notificationId);

        return PendingIntent.getActivity(
                this.reactContext,
                0,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT
        );
    }
}
