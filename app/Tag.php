<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Tag extends Model
{
	use Sluggable;

	protected $fillable = ['title'];

    public function images()	
	{
	    return $this->belongsToMany(
	    	Images::class,
	    	'images_tags',
	    	'tag_id',
	    	'image_id'
	    );
	} 

	public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }
}
