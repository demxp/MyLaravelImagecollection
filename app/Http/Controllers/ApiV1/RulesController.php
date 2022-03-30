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
        $user = User::find($user_id);
        if(!$user) 
            return response([
                "status" => "error",
                "message" => "User not found"
            ], 404)->header('Content-Type', 'application/json');

        return response([
            'status' => 'ok',
            'data'   => UserRules::normalizeRulesTable($user),
            'editable' => \Auth::user()->is_admin
        ], 200)->header('Content-Type', 'application/json');
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
