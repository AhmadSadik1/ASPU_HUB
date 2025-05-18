<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\Photo;
use App\Models\Video;
use App\Models\Comment;
use Illuminate\Support\Facades\Hash;
use App\Notifications\NewMessageNotification;
class CummunityController extends Controller
{
    public function Add_Post(){
         // التحقق من البيانات
         $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'typePost' => 'required|string',
            'community_id' => 'required|exists:communities,id',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // إنشاء البوست
        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'typePost' => $request->typePost,
            'community_id' => $request->community_id,
            'user_id' => auth()->id(), // أو $request->user_id حسب السياق
            'positiveVotes' => 0,
            'negativeVotes' => 0,
        ]);
    
        // رفع الصور وربطها بالبوست
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $imageName = time() . '_' . $image->getClientOriginalName();
                $path = $image->storeAs('posts', $imageName, 'public');
    
                Photo::create([
                    'post_id' => $post->id,
                    'photo' => $path,
                ]);
            }
        }
    
        return response()->json([
            'message' => 'تم إنشاء البوست بنجاح مع الصور',
            'post' => $post->load('photos')
        ], 201);
    } 
    public function Add_Comment(){
        $validated = $data->validate([
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id',
            'parent_comment_id' => 'nullable|exists:comments,id'
        ]);
    
        $comment = Comment::create([
            'content' => $validated['content'],
            'post_id' => $validated['post_id'],
            'user_id' => auth()->id(), // أو $data->user()->id لو عامل Auth::guard
            'parent_comment_id' => $validated['parent_comment_id'] ?? null,
            'positive_votes' => 0,
            'negative_votes' => 0,
        ]);
        $postOwner = $comment->post->user;
        $postOwner->notify(new NewMessageNotification($comment));
    
        return response()->json([
            'message' => 'تم إضافة التعليق بنجاح',
            'comment' => $comment
        ], 201);
    }
    public function Get_All_Post(Request $data)  {
        $user = $data->user();
        $posts=Post::where('community_id',$data->community_id)->get();
        return response()->json($posts,200);
    }
}
