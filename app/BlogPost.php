<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class BlogPost extends Model
{
	use Sluggable;

    protected $fillable = ['title', 'content'];

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
        $post = new static;
        $post->fill($fields);
        $post->owner = \Auth::user()->id;
        $post->save();

        return $post;
    }

    public function hasPrevious()
    {
        return self::where('id', '<', $this->id)->max('id');
    }

    public function hasNext()
    {
        return self::where('id', '>', $this->id)->min('id');
    }    

    public function getPrevious()
    {
        $postId = $this->hasPrevious();
        return self::find($postId);
    }

    public function getNext()
    {
        $postId = $this->hasNext();
        return self::find($postId);
    }    
}
