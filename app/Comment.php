<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Http\Resources\CommentShort;

class Comment extends Model
{
	public $commentAllowEdit = null;

    public static function add($data)
    {
    	$comment = new static;
        $comment->name = trim(strip_tags($data['name']));
        $comment->email = trim(strip_tags($data['email']));
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

    public static function getByPost($id)
    {
    	$all = CommentShort::collection(self::where('post_id', $id)->orderBy('id')->get())->toArray(1);

    	function compose($data)
    	{
	    	$iterator = function($data, $acc, $topId) use (&$iterator)
	    	{
				foreach($data as $item){
					if($item['topComment'] == $topId){
						$item['children'] = $iterator($data, [], $item['id']);
						$acc[] = $item;
					}
				}
				return $acc;
	    	};

	    	return $iterator($data, [], 0);
    	}

    	return compose($all);
    }

    public function allowEditGenCode()
    {
    	$this->commentAllowEdit = md5($this->id . '-' . $this->updated_at . '-' . $this->post_id);
    }

    public static function deleteComment($data)
    {
    	if(!isset($data['id']) || !isset($data['allowEdit'])) return false;

    	$comment = self::where('id', $data['id'])->first();
    	if(!$comment) return false;
    	$comment->allowEditGenCode();
    	if($comment->commentAllowEdit != $data['allowEdit']) return false;
    	$comment->delete();
    	return true;
    }

    public static function editComment($data)
    {
    	if(!isset($data['id']) || !isset($data['allowEdit'])) return false;

    	$comment = self::where('id', $data['id'])->first();
    	if(!$comment) return false;
    	$comment->allowEditGenCode();
    	if($comment->commentAllowEdit != $data['allowEdit']) return false;
    	$comment->content = $data['content'];
    	$comment->save();
    	$comment->allowEditGenCode();
    	return $comment;
    }    
}
