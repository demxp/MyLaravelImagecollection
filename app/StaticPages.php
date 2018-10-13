<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class StaticPages extends Model
{
	use Sluggable;

	protected $fillable = ['title', 'content'];

    public function author()
    {
    	return $this->hasOne(User::class);
    }

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public static function add($fields)
    {
    	$static_page = new static;
    	$static_page->fill($fields);
    	$static_page->user_id = \Auth::user()->id;
    	$static_page->save();
    }

    public function edit($fields)
    {
    	$this->fill($fields);
    	$this->save();
    }

    public function remove()
    {
    	$this->delete();
    }

    public function changeLink($value)
    {
    	if(isNull($value)) {return;}
    	// написать проверку на уникальнсть и далее сохранение 
    	return;
    }
}
