<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ImageShort extends JsonResource
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
            'fullimage' => $this->fullimage,
            'status' => $this->status,
            'getlink' => $this->getlink,
            'thumbnail' => $this->thumbnail,
            'category' => (!is_null($this->category)) ? new CategoryShort($this->category) : null,
            'iscattitle' => $this->checkTitle()
        ];
    }

    public function checkTitle()
    {
        if(is_null($this->category)) return false;
        return $this->category->titleimage == $this->id;
    }
}
