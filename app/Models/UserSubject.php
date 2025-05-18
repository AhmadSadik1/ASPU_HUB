<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSubject extends Model
{
    use HasFactory;
    protected $table='user_subjects';

    protected $fillable = [

        'specialization_id',
        'name',
        'hours_count',
        'description',
        'partical_mark',
        'abstract_mark',
        'userID',
        'subectID',
        'has_been_finished',
        'has_been_canceled',
        'mark'
    ];

    public function specialization()
    {
        return $this->belongsTo(Specialization::class);
    }




    public function user()
    {
        return $this->belongsTo(User::class, 'userID' );
    }

    public function subject()
    {

        return $this->belongsTo(Subject::class,'subectID');

    }



    public function semester()
    {
        return $this->belongsTo(UserSemester::class, 'semesterID');
    }

    public function docs()
    {
        return $this->hasMany(Docs::class);
    }



}
