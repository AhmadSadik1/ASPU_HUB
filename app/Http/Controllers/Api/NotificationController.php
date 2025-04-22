<?php

namespace App\Http\Controllers\API;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use  App\Notifications\NewMessageNotification;
class NotificationController extends Controller
{
    public function create_notification(Request $data){
        $user=$data->user();
        $messagetitle=$data->message_title;
        $messagebody=$data->message_body;
        $user->notify(new NewMessageNotification($messagetitle,$messagebody));
        return response()->json("تمت العملية بنجاح", 200);
        }
        public function get_all_notification(Request $data)  {
        $user=$data->user();
        $notifications=$user->notifications->map(function ($notification) {
            return [
                'title' => $notification->data['title'],
                'body' => $notification->data['body'],
            ];
        });
        return response()->json($notifications, 200);
        }
}
