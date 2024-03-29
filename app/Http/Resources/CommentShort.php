<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentShort extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $result = [
            'id' => $this->id,
            'name' => $this->name,
            'content' => $this->content,
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
            'topComment' => $this->topComment,
            'allowEdit' => $this->commentAllowEdit,
            'moderation' => $this->moderation,
            'fromAdmin' => $this->fromAdmin
        ];

        if(\Auth::check()) $result['commentStatus'] = $this->status;

        return $result;
    }
}
