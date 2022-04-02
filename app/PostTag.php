<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class PostTag extends Model
{
	use Sluggable;

	protected $fillable = ['title'];

	protected $table = 'tags';

    public function posts()
    {
        return $this->belongsToMany('App\BlogPost', 'posts_tags', 'tag_id', 'post_id');
    }

	public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }  

    public static function add($data)
    {
    	$tag = new static;
    	$tag->title = mb_strtoupper($data['title']);
    	$tag->user_id = \Auth::user()->id;
        $tag->save();

        return $tag;
    }

    public function edit($data)
    {
    	$this->title = mb_strtoupper($data['title']);
        $this->save();

        return $this;
    }

    public static function findDuble($title)
    {
        $title = mb_strtoupper($title);
        return self::where('title', $title)->count() > 0;
    }

    public function remove()
    {
    	$this->delete();
    }
}
