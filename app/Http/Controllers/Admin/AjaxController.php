<?php

namespace App\Http\Controllers\Admin;

use App\Images;
use Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class AjaxController extends Controller
{
	protected function failedValidation(Validator $validator)
	{
	   throw (new ValidationException($validator))->errorBag($this->errorBag);
	}

    public function init(Request $request)
    {
		$data = $request->json();
		$group = $data->get('group');
		if(!method_exists($this, $group)){
			return json_encode(["status" => "error", "message" => "ErrorOperation"]);
		}

		return json_encode($this->$group($data));
    }

    public function imageOperation($data)
    {
    	$id = $data->get('id');
    	$val = $data->get('data');
    	$command = $data->get('command');
        $needAdminRights = false;

    	switch($data->get('command')){
    		case("setTitle"):
    			$validator = Validator::make($data->all(), [
        			'id' => 'required|integer',
        			'data' => 'required|min:5',
    			]);
    			break;
    		case("setCategory"):
    			$validator = Validator::make($data->all(), [
        			'id' => 'required|integer',
        			'data' => 'required',
    			]);
    			break;
    		case("toggleVisibility"):
    			$validator = Validator::make($data->all(), [
        			'id' => 'required|integer'
    			]);
    			break;
    		case("setCategoryTitleimage"):
    			$validator = Validator::make($data->all(), [
        			'id' => 'required|integer',
        			'data' => 'required|integer',
    			]);
                $needAdminRights = true;
    			break;
            case("delImage"):
                $validator = Validator::make($data->all(), [
                    'id' => 'required|integer'
                ]);
                $command = "remove";                
                break;
    		default:
    			return [
    				"status" => "error",
    				"message" => "IncorrectInputData"
    			];

    	}

    	if($validator->fails()) {
    		return [
    			"status" => "error",
    			"message" => "IncorrectInputData"
    		];
 		}

        $image = Images::find($id);

        if($needAdminRights && Auth::user()->is_admin == 0){
            return [
                "status" => "error",
                "message" => "NotEnoughRights"
            ];
        }

        if(($image->user_id != Auth::user()->id) && (Auth::user()->is_admin == 0)){
            return [
                "status" => "error",
                "message" => "NotEnoughRights"
            ];            
        }

        $image->$command($val);
        return [
            "status" => "ok"
        ];                    
    }
}

