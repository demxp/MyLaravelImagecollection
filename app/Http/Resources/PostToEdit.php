<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PostToEdit extends JsonResource
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
            'title_image' => $this->title_image,
            'content' => $this->content,
            'publication' => $this->publication,
            'publication_date' => $this->publication_date,
            'commenting' => $this->commenting,
            'tags' => TagShort::collection($this->tags)
        ];
    }
}
