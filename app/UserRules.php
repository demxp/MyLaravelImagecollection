<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserRules extends Model
{
    protected $fillable = ['user_id', 'component', 'method', 'rule'];

    public $incrementing = false;

	public static function currentRulesTable()
	{
		$methods = [
			'get' 		=> ["allow", "deny"],
			'post' 		=> ["allow", "deny"],
			'put' 		=> ["allow", "owned", "deny"],
			'delete' 	=> ["allow", "owned", "deny"]
		];

		$routes = ['images', 'categories', 'staticpages', 'posts', 'audiofiles'];

		return array_reduce($routes, function($acc, $route) use ($methods){
			foreach($methods as $method => $rules){
				$acc[] = [$route, $method, '', $rules];
			}

			return $acc;
    	}, []);
	}

	public static function normalizeRulesTable($user)
	{
    	$user_rules = $user->apiRules->toArray();
    	$template = self::currentRulesTable();

    	array_map(function($userRule) use (&$template){
			foreach($template as $id => $rule){
				if($rule[0] == $userRule['component'] && $rule[1] == $userRule['method']){
					$template[$id][2] = $userRule["rule"];
				}
			}
    	}, $user_rules);

    	return $template;		
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
        $method = strtolower($request->method());

        if(!$checkHard){
			return self::checkAccessSoft($method, $user, $url_data, $parentModel);
	    }
	    return self::checkAccessHard($method, $user, $url_data);
	}

	public static function checkAccessSoft($method, $user, $url_data, $parentModel)
	{
        $findRule = $user->apiRules()
        ->where('component', $url_data["component"])
        ->where('method', $method)
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

	public static function checkAccessHard($method, $user, $url_data)
	{
		if($user->is_admin == 1){
	        return true;
	    }elseif($user->id == $url_data["resource_id"] || ($url_data["resource_id"] == 0 && $method == 'get')){
	    	return true;
	    }
		return false;
	}

}
