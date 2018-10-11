<?php

namespace App\Http\Controllers\Admin;

use App\Images;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class AjaxController extends Controller
{
	protected function failedValidation(Validator $validator)
	{
	   throw (new ValidationException($validator))->errorBag($this->errorBag);
		//dd($validator);
	}

    public function init(Request $request)
    {
		$data = $request->json();
		$group = $data->get('group');
		if(!method_exists($this, $group)){
			return json_encode(["status" => "error", "message" => "error operation"]);
		}

		return json_encode($this->$group($data));
    }

    public function imageOperation($data)
    {
    	$id = $data->get('id');
    	$val = $data->get('data');
    	$command = $data->get('command');

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
    			break;    		
    		default:
    			return [
    				"status" => "error",
    				"message" => "incorrect input data"
    			];

    	}

    	if($validator->fails()) {
    		return [
    			"status" => "error",
    			"message" => "incorrect input data"
    		];
 		}

    	Images::find($id)->$command($val);

    	return [
    		"status" => "ok"
    	];
    }
}

