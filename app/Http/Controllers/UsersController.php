<?php

namespace App\Http\Controllers;

use App\Images;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

    public function saveUploadImage(Request $request)
    {
        $user = User::checkApiAccess($request);

        if(is_null($user)){
            abort(401, 'Unauthorized.');
        }

        $filename = Images::externalUpload($request->file('uploadfile'), $user);
        return $filename;
    } 

    public function getUploadedImage($filename, $thumbnail=null)
    {
        $image = Images::findImage($filename);
        if(is_null($image)){
            abort(404, 'Not found.');
        }

        $path = 'uploads/pictures/user'.$image->user_id."/".((!is_null($thumbnail)) ? 'thumbnails/' : "").$filename;

        return response()->file($path);
    }
}
