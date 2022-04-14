<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostShort extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'publication' => $this->publication,
            'commenting' => $this->commenting,
            'link' => $this->genLink(),
        ];
    }

    public function genLink()
    {
        if($this->publication == 1){
            return \URL::to('/').'/post/'.$this->slug;
        }else{
            return \URL::to('/').'/post/'.$this->slug.'/hidden/'.$this->resource->genPostOpenKey();
        }
    }
}
