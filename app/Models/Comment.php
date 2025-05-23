<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// app/Models/Comment.php
class Comment extends Model
{
    use HasFactory;

    protected $fillable = [
        'content',
        'post_id',
        'user_id',
        'positive_votes',
        'negative_votes',
        'parent_comment_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

  #  public function post()
   # {
    #    return $this->belongsTo(Post::class);
    #}

    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id');
    }

    public function childComments()
    {
        return $this->hasMany(Comment::class, 'parent_comment_id');
    }
    public function post(){
        return $this->belongsTo(post::class);
    }
}

