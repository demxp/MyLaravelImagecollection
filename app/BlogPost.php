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

    public function tags()
    {
        return $this->belongsToMany('App\PostTag', 'posts_tags', 'post_id', 'tag_id');
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
        $post->processingPublication($fields);
        $post->processingTags($fields);
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
        $this->processingPublication($fields);
        $this->processingTags($fields);
        if(isset($fields['commenting'])){
            $this->commenting = $fields['commenting'];
        }
        if(isset($fields['title_image']) && strlen($fields['title_image']) > 3){
            $this->title_image = $fields['title_image'];
        }else{
            $this->title_image = null;
        }
    	$this->save();
    }

    public function processingPublication($fields)
    {
        if(isset($fields['publication'])){
            $this->publication = $fields['publication'];
            if($this->publication == 0){
                $this->publication_date = null;
            }else{
                if(isset($fields['publication_date'])){
                    $this->publication_date = $fields['publication_date'];
                }else{
                    $this->publication_date = date(DATE_ATOM);
                }
            }
        }

        return $this;
    }

    public function processingTags($fields)
    {
        $tags = array_reduce($fields['tags'], function($acc, $item){
            $acc[] = $item['id'];
            return $acc;
        }, []);

        $this->tags()->sync($tags);

        return $this;
    }

    public function hasPrevious()
    {
        return self::where([
            ['id', '<', $this->id],
            ['publication', 1]
        ])->orderBy('id', 'desc')->first();
    }

    public function hasNext()
    {
        return self::where([
            ['id', '>', $this->id],
            ['publication', 1]            
        ])->orderBy('id', 'asc')->first();
    }    

    public function getPublishedAttribute()
    {
        return $this->publication_date;
    }

    public function getShortedContentAttribute()
    {
        $this->proceedShortcodes(true);

        $string = strip_tags($this->content, '--readmore--');
        $pos = strpos($string, '--readmore--');
        $string = substr($string, 0, $pos);
        return $string."… ";
    }

    public function getNoRMContentAttribute()
    {
        $this->proceedShortcodes();

        $clear_patterns = [
            '/\-\-readmore\-\-/',
        ];
        return preg_replace($clear_patterns, '', $this->content);
    }    

    public function proceedShortcodes($clear=false)
    {
        $codes = [
            '/\[audio-player,\"([\/a-zA-Z0-9._-]+)\",\"([\/a-z0-9-.]+)\"\]/im'
        ];

        $replacers = '';

        if(!$clear){
            $replacers = [
                '<audio-player url="$1" playerid="$2"> </audio-player>'
            ];
        }

        $this->content = preg_replace($codes, $replacers, $this->content);

        return $this;
    }

    public function remove()
    {
        return $this->delete();
    }    
}
