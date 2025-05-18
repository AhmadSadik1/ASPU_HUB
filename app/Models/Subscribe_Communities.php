<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscribe_Communities extends Model
{
    use HasFactory;
    protected $fillable = ['community_id', 'user_id'];
    public function User(){
    return $this->belongsTo(User::class, 'user_id');
    }
}
