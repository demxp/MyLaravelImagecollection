<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
//use Illuminate\Support\Facades\DB;

class UsersController extends Controller
{
    public function getUploadToken(Request $request)
    {
        $token = User::createApiAccess($request->get('key'));

        if(is_null($token)){
            abort(401, 'Unauthorized.');
        }
        return $token;
    }  
}
