<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use ElemenX\ApiPagination\Paginatable;
use Carbon\Carbon;

class BlogPost extends Model
{
	use Sluggable;
	use Paginatable;

    protected $fillable = ['title', 'content'];
    protected $appends = ['published', 'shortedContent'];

	public function author()
	{
	    return $this->belongsTo(User::class, 'owner');
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
        $post = new static;
        $post->fill($fields);
        $post->owner = \Auth::user()->id;
        $post->save();

        return $post;
    }

    public function edit($fields)
    {
    	$this->fill($fields);
        if(isset($fields['publication'])){
            $this->publication = $fields['publication'];
            if($this->publication == 0){
            	$this->publication_date = null;
            }else{
            	$this->publication_date = date(DATE_ATOM);
            }
        }
    	$this->save();
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

    public function getPublishedAttribute()
    {
        $pd = $this->publication_date;
        if(!is_null($pd)){
			return Carbon::createFromFormat('Y-m-d H:i:s', $pd)->setTimezone('Europe/Moscow')->format('d.m.Y H:i');
        }
        return '';
    }

    public function getShortedContentAttribute()
    {
        $string = strip_tags($this->content, '<--readmore-->');
        $pos = strpos($string, '<--readmore-->');
        $string = substr($string, 0, $pos);
        return $string."… ";
    }
}
