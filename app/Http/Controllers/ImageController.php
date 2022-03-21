<?php

namespace App\Http\Controllers;

use App\User;
use App\Images;
use Illuminate\Http\Request;

class ImageController extends Controller
{
    public function saveUploadImage(Request $request)
    {
        $user = User::checkApiAccess($request);

        if(is_null($user)){
            abort(401, 'Unauthorized.');
        }

        $filename = Images::externalUpload($request->file('uploadfile'), $user);

        $link = $request->root().'/upload/getimage/'.$filename;
        return ['link' => $link];
    } 

    public function getUploadedImage($filename, $thumbnail=null)
    {
        $image = Images::findImage($filename);
        if(is_null($image)){
            abort(404, 'Not found.');
        }

        if(is_null($thumbnail)) return response()->file(\getcwd().$image->getImageFile());
        return response()->file(\getcwd().$image->getThumbnail());
    }
}
