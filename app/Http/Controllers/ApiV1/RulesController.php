<?php

namespace App\Http\Controllers\ApiV1;

use Illuminate\Http\Request;
use App\User;
use App\UserRules;
use App\Http\Controllers\Controller;

class RulesController extends Controller
{
    public function getRules($user_id)
    {
    	$template = UserRules::currentRulesTable();
    	$user_rules = User::find($user_id)->apiRules->toArray();

    	$ret = array_map(function($rule) use (&$template){
    		$fnd = function($arr, $elem1, $elem2){
    			foreach($arr as $key=>$elem){
    				if($elem[0] == $elem1 && $elem[1] == $elem2){
    					return $key;
    				}
    			}
    		};
    		$index = $fnd($template["data"], $rule["component"], $rule["method"]);
  			$template["data"][$index][2] = $rule["rule"];
    	}, $user_rules);

        $template['is_editable'] = \Auth::user()->is_admin;

    	return $template;
    }

    public function setRules(Request $request, $id)
    {
    	if(\Auth::user()->is_admin == 0){
            return response([
                "status" => "error",
                "message" => "NotEnoughRights"
            ], 403)->header('Content-Type', 'application/json');    		
    	}

    	$tosave = [];

    	foreach($request->all() as $rule){
    		$tosave[] = [
    			'user_id' => $id,
    			'component' => $rule[0],
    			'method' => $rule[1],
    			'rule' => $rule[2]
    		];
    	}

		$user = User::find($id);
		$user->apiRules()->delete();
		$user->apiRules()->createMany($tosave);

    	return ["status" => "ok"];
    }
}
