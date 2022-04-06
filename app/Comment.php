<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\CommentShort;
use App\BlogPost;

class Comment extends Model
{
	public $commentAllowEdit = null;

    const COMMENT_NEW = 0;
    const COMMENT_MODERATED = 1;

    public static function add($data, $fromAdmin=false)
    {
    	$comment = new static;
        if($fromAdmin){
            $comment->name = $fromAdmin->name;
            $comment->email = $fromAdmin->email;
            $comment->fromAdmin = true;
            $comment->status = 1;
        }else{
            $comment->name = trim(strip_tags($data['name']));
            $comment->email = trim(strip_tags($data['email']));
        }
        $comment->topComment = $data['topCommentId'];
        $comment->post_id = $data['postId'];
        $comment->content = trim(strip_tags($data['content'], '<p><b><i><u><br>'));
	 	try{
	        $comment->save();
	    }catch(\Throwable $e){
			info($e, 1);
			return false;
	    }

	    $comment->allowEditGenCode();
        return $comment;
    }

    public static function getByPost($id, $filter)
    {
        $conditions = [['post_id', $id]];

        if($filter == BlogPost::COMMENTING_NOT_ALLOW) return [];
        if($filter == BlogPost::COMMENTING_MODERATED) $conditions[] = ['status', self::COMMENT_MODERATED];

    	return CommentShort::collection(self::where($conditions)->orderBy('id')->get())->toArray(1);
    }

    public function allowEditGenCode()
    {
    	$this->commentAllowEdit = md5($this->id . '-' . $this->updated_at . '-' . $this->post_id);
    }

    public static function deleteComment($data, $fromAdmin=false)
    {
        if(!$fromAdmin){
        	if(!isset($data['id']) || !isset($data['allowEdit'])) return false;

        	$comment = self::where('id', $data['id'])->first();
        	if(!$comment) return false;
        	$comment->allowEditGenCode();
        	if($comment->commentAllowEdit != $data['allowEdit']) return false;
        }else{
            $comment = self::where('id', $data['id'])->first();            
        }
    	$comment->delete();
    	return true;
    }

    public static function editComment($data, $fromAdmin=false)
    {
        if(!$fromAdmin){
        	if(!isset($data['id']) || !isset($data['allowEdit'])) return false;

        	$comment = self::where('id', $data['id'])->first();
        	if(!$comment) return false;
        	$comment->allowEditGenCode();
        	if($comment->commentAllowEdit != $data['allowEdit']) return false;
            $comment->content = $data['content'];
            $comment->status = self::COMMENT_NEW;
        }else{
            $comment = self::where('id', $data['id'])->first();
            if(isset($data['content'])) $comment->content = $data['content'];
            if(isset($data['commentStatus'])) $comment->status = $data['commentStatus'];
        }
    	$comment->save();
    	$comment->allowEditGenCode();
    	return $comment;
    }    
}
