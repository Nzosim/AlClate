<?php

namespace alclate\api\domain\entities;

/**
 * Class Users qui permet de gérer les utilisateurs
 */
class Retard extends \Illuminate\Database\Eloquent\Model
{
    protected $table = 'retard';
    protected $primaryKey = 'Id';
    public $timestamps = false;
    protected $fillable = ['Id', 'Date', 'Moment', 'Temps'];

}