<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;

class Category extends Model
{
	use Sluggable;

    protected $fillable = ['title'];

    public function images()
    {
    	return $this->hasMany(Images::class);
    }

    public function headimage()
    {
        return $this->hasOne(Images::class, 'id', 'titleimage');
    }

    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'title'
            ]
        ];
    }

    public function getTitleImage()
    {
        if(is_null($this->titleimage) || is_null($this->headimage)){
            return "/img/no_picture.jpg";
        }

        return $this->headimage->getImageFile();
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
        $catId = $this->hasPrevious();
        return self::find($catId);
    }

    public function getNext()
    {
        $catId = $this->hasNext();
        return self::find($catId);
    }    

    public function setHeadImage($id)
    {
        $this->titleimage = $id;
        $this->save();
    }
}
