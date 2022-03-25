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
    protected $appends = ['published', 'shortedContent', 'noRMContent'];

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
        if(isset($fields['publication'])){
            $post->publication = $fields['publication'];
            if($post->publication == 0){
                $post->publication_date = null;
            }else{
                if(isset($fields['publication_date'])){
                    $post->publication_date = Carbon::createFromFormat('Y-m-d H:i', $fields['publication_date'])
                    ->subHours(3)
                    ->format('Y-m-d H:i:s');
                }else{
                    $post->publication_date = date(DATE_ATOM);
                }
            }
        }
        if(isset($fields['commenting'])){
            $post->commenting = $fields['commenting'];
        }                
        if(isset($fields['title_image'])){
            $post->title_image = $fields['title_image'];
        }                        
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
                if(isset($fields['publication_date'])){
                    $this->publication_date = Carbon::createFromFormat('Y-m-d H:i', $fields['publication_date'])
                    ->subHours(3)
                    ->format('Y-m-d H:i:s');
                }else{
                    $this->publication_date = date(DATE_ATOM);
                }
            }
        }
        if(isset($fields['commenting'])){
            $this->commenting = $fields['commenting'];
        }        
    	$this->save();
    }

    public function hasPrevious()
    {
        return self::where('id', '<', $this->id)->orderBy('id', 'desc')->first();
    }

    public function hasNext()
    {
        return self::where('id', '>', $this->id)->orderBy('id', 'asc')->first();
    }    

    public function getPublishedAttribute()
    {
        $pd = $this->publication_date;
        $addNull = function($int){
            return ((int)$int > 9) ? $int : '0'.(string)$int;
        };
        $months = explode(',', 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря');
        if(!is_null($pd)){
            $time = Carbon::createFromFormat('Y-m-d H:i:s', $pd)->setTimezone('Europe/Moscow')->toObject();
            return $time->day . ' ' . $months[$time->month-1] . ' ' . $time->year . ' в ' . $addNull($time->hour) . ':' . $addNull($time->minute);
        }
        return '';
    }

    public function getShortedContentAttribute()
    {
        $string = strip_tags($this->content, '--readmore--');
        $pos = strpos($string, '--readmore--');
        $string = substr($string, 0, $pos);
        return $string."… ";
    }

    public function getNoRMContentAttribute()
    {
        return str_replace("--readmore--", '', $this->content);
    }    
}
