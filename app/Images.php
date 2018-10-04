<?php

namespace App;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Images extends Model
{
	use Sluggable;

	protected $fillable = ['title', 'image'];

	public function category()
	{
	   	return $this->hasOne(Category::class);
	}

	public function author()
	{
	    return $this->hasOne(User::class);
	}

	public function tags()	
	{
	    return $this->belongsToMany(
	    	Tag::class,
	    	'images_tags',
	    	'image_id',
	    	'tag_id'
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

    public static function add($fields)
    {
    	$image = new static;
    	$image->fill($fields);
    	$image->user_id = 1;
    	if($image->image == null){
    		$image->image = 'no_image.jpg';
    	}
    	$image->save();

    	return $image;
    }

    public function edit($fields)
    {
    	$this->fill($fields);
    	$this->save();
    }

    public function remove()
    {
    	Storage::delete('uploads'.$this->image);
    	$this->delete();
    }

    public function uploadImage($image)
    {
    	if($this->image != null){
    		Storage::delete('uploads'.$this->image);
    	}
    	$filename = str_random(10) . '.' . $image->extension;
    	$image->saveAs('uploads/', $filename);
    	$this->image = $filename;
    	$this->save();

    	return $filename;
    }

    public function getImageFile()
    {
    	if(!isNull($this->image)){
    		return '/uploads/'.$this->image;
    	}
    	return '/img/no_image.jpg';
    }

    public function setCategory($id)
    {
    	if($id == null) { return;}

    	$this->category_id = $id;
    	$this->save();
    }

    public function setTags($ids)
    {
    	if($ids == null) { return; }

    	$this->tags()->sync($ids);
    }

    public function setHidden()
    {
    	$this->status = 0;
    	$this->save();
    }

    public function setShowed()
    {
    	$this->status = 1;
    	$this->save();
    }

    public function toggleVisibility($value)
    {
    	if(isNull($value)){
    		return $this->setHidden();
    	}
    	return $this->setShowed();
    }
}
