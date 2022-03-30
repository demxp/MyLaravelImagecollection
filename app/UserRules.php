<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRules extends Model
{
    protected $fillable = ['user_id', 'component', 'method', 'rule'];

    public $incrementing = false;

	public static function currentRulesTable()
	{
		return [
			"rules" => ["allow", "owned", "deny"],
			"names" => [
				"images" => "картинок:",
				"categories" => "категорий:",
				"staticpages" => "страниц:",
				"posts" => "постов:",
				"audiofiles" => "аудиофайлов:",
				"get" => "Просмотр",
				"post" => "Создание",
				"put" => "Изменение",
				"delete" => "Удаление",
				"allow"  => "разрешено",
				"owned" => "добавленных",
				"deny" => "запрещено"
			],
			"data" => [
				["images", "get", "", ["allow", "deny"]],
				["images", "post", "", ["allow", "deny"]],
				["images", "put", "", ["allow", "owned", "deny"]],
				["images", "delete", "", ["allow", "owned", "deny"]],
				["categories", "get", "", ["allow", "deny"]],
				["categories", "post", "", ["allow", "deny"]],
				["categories", "put", "", ["allow", "owned", "deny"]],
				["categories", "delete", "", ["allow", "owned", "deny"]],
				["staticpages", "get", "", ["allow", "deny"]],
				["staticpages", "post", "", ["allow", "deny"]],
				["staticpages", "put", "", ["allow", "owned", "deny"]],
				["staticpages", "delete", "", ["allow", "owned", "deny"]],
				["posts", "get", "", ["allow", "deny"]],
				["posts", "post", "", ["allow", "deny"]],
				["posts", "put", "", ["allow", "owned", "deny"]],
				["posts", "delete", "", ["allow", "owned", "deny"]],
				["audiofiles", "get", "", ["allow", "deny"]],
				["audiofiles", "post", "", ["allow", "deny"]],
				["audiofiles", "put", "", ["allow", "owned", "deny"]],
				["audiofiles", "delete", "", ["allow", "owned", "deny"]]
			]
		];
	}

	public function user()
	{
	    return $this->hasOne(User::class, 'user_id');
	}

	public static function checkAccess($request, $parentModel, $checkHard=false)
	{
		preg_match("/api\/v[1-9]+\/([a-z]+)\/?([0-9]+)?/", $request->path(), $matches);
		$matches = array_pad ($matches, 3, 0);

		$url_data = [
			"component" => $matches[1],
			"resource_id" => $matches[2]
		];

        $user = \Auth::user();

        if(!$checkHard){
			return self::checkAccessSoft($request, $user, $url_data, $parentModel);
	    }
	    return self::checkAccessHard($request, $user, $url_data);
	}

	public static function checkAccessSoft($request, $user, $url_data, $parentModel)
	{
        $findRule = $user->apiRules()
        ->where('component', $url_data["component"])
        ->where('method', strtolower($request->method()))
        ->value('rule');

        if($findRule == "allow"){
            return true;
        }elseif($findRule == "owned"){
            if($parentModel::where('user_id', $user->id)->where('id', $url_data["resource_id"])->count() != 0){
                return true;
            }
        }elseif($url_data["resource_id"] == 0 && $findRule != "deny" && $findRule != null){
        	return true;
        }

        return false;
	}	

	public static function checkAccessHard($request, $user, $url_data)
	{
		if($user->is_admin == 1){
	        return true;
	    }elseif($user->id == $url_data["resource_id"] || ($url_data["resource_id"] == 0 && $request->method() == 'GET')){
	    	return true;
	    }
		return false;
	}

}
