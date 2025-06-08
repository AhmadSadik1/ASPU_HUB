<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'hour_count',
        'Description',
        'paraticalMark',
        'abstractMark',
        'SpecializationID',
        'status'
    ];

    public function specialization()
    {
        return $this->belongsTo(Specialization::class, 'SpecializationID');
    }


    public function userSubjects()
    {
        return $this->hasMany(UserSubject::class, 'subjectID');
    }


    public function previousSubjects()
    {
        return $this->hasMany(PreviousSubjects::class, 'subjectID');
    }


    public function prerequisites()
    {
        return $this->hasMany(PreviousSubjects::class, 'PreviousSubjectID');
    }
}
