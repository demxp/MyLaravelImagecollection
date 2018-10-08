<?php

namespace App;

use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Images extends Model
{
	use Sluggable;

	protected $fillable = ['title'];

	public function category()
	{
	   	return $this->belongsTo(Category::class);
	}

	public function author()
	{
	    return $this->belongsTo(User::class, 'user_id');
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
        $image->image = self::uploadImageByString($fields['image']);
    	$image->save();

    	return $image;
    }

    public function edit($fields)
    {
    	$this->fill($fields);
        if(!is_null($fields['image'])){
            Storage::delete('uploads/'.$this->image);
            $this->image = self::uploadImageByString($fields['image']);
        }
    	$this->save();
    }

    public function remove()
    {
    	Storage::delete('uploads/'.$this->image);
    	$this->delete();
    }

    public static function uploadImageByString($imagestring)
    {
        if(is_null($imagestring)) {return;}
        $parsed_image = preg_split("/[:;,]+/", $imagestring);
        
        // Декодируем данные, закодированные алгоритмом MIME base64
        $decodedData = base64_decode($parsed_image[3]);

        // Создаем изображение на сервере
        $filename = str_random(10) . '.jpg';
        imagejpeg(imagecreatefromstring($decodedData), 'uploads/' . $filename);
        return $filename;

        // Надо бы как-то отлавливать косяки, если возникнут...
        //if (imagejpeg(imagecreatefromstring($decodedData), 'uploads/' . $filename)) {
        //    return $filename;
        //}else{
        //    return 1;
        //}
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
    	if(!is_null($this->image)){
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

    public function setPrivate()
    {
    	$this->status = 0;
    	$this->save();
    }

    public function setPublic()
    {
    	$this->status = 1;
    	$this->save();
    }

    public function toggleVisibility($value)
    {
    	if(!is_null($value)){
    		return $this->setPrivate();
    	}
    	return $this->setPublic();
    }

    public function getCategoryTitle()
    {
        if(is_null($this->category)){
            return "Нет категории";
        }
        return $this->category->title;
    }

    public function getTags()
    {
        return implode(', ', $this->tags->pluck('title')->all());
    }    
}
