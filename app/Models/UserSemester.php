<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSemester extends Model
{
    use HasFactory;
     
    protected $fillable = ['userID', 'SpecializationID','start_date','end_date','semester_number','semester_hours','year_degree'];
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }
}
