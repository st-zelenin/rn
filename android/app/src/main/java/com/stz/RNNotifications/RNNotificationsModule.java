package com.stz.RNNotifications;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.stz.RNNotifications.services.NotificationID;

public class RNNotificationsModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;
    private final String channelId = "com.stz.rnnotifications";
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
        Notification notification = new Notification.Builder(this.reactContext)
                .setContentTitle(title)
                .setContentText(message)
                .setSmallIcon(android.R.drawable.ic_dialog_info)
                .setChannelId(this.channelId)
                .build();

        int notificationId = NotificationID.getID();
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
                .build();

        notificationManager.notify(notificationId, notification);
    }

    @ReactMethod
    public void remove(int notificationId) {
        this.notificationManager.cancel(notificationId);
    }
}
