<?php

namespace App;

use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    protected $appends = array('avatarimage');

    public function images()
    {
        return $this->hasMany(Images::class);
    }

    public function staticPages()
    {
        return $this->hasMany(StaticPages::class);
    }

    public function apiRules()
    {
        return $this->hasMany(UserRules::class);
    }

    public static function add($fields)
    {
        $user = new static;
        $user->fill($fields);
        $user->password = bcrypt($fields['password']);
        $user->uploadertoken = md5(str_random(10).$user->email);
        $user->save();

        self::createUserUploadFolder($user->id);

        return $user;
    }

    public function edit($fields)
    {
        $this->fill($fields);
        if(!is_null($fields['password'])){
            $this->password = bcrypt($fields['password']);
        }
        $this->save();

    }

    public function remove()
    {
        $this->removeAvatar();
        $this->removeUserUploadFolder();
        $this->delete();
    }

    public function uploadAvatar($avatar)
    {
        if(is_null($avatar)) {return;}
        $parsed_image = preg_split("/[:;,]+/", $avatar);
        
        // Декодируем данные, закодированные алгоритмом MIME base64
        $decodedData = base64_decode($parsed_image[3]);

        // Создаем изображение на сервере
        $filename = md5(uniqid()) . '.jpg';
        $path = '/storage/pictures/user'.$this->id.'/avatars';
        Storage::makeDirectory($path);
        
        if (Image::make(imagecreatefromstring($decodedData))->encode('jpg', 75)->save(\getcwd().$path.'/'.$filename)) {
            $this->removeAvatar();
            $this->avatar = $filename;
            $this->save();
            return 0;
        }else{
            return 1;
        }
    }  

    public function removeAvatar()
    {
        if($this->avatar != null){
            Storage::delete('/storage/pictures/user'.$this->id.'/avatars/'.$this->avatar);
        }
    }

    public function getAvatar()
    {
        if(!is_null($this->avatar)){
            return '/storage/pictures/user'.$this->id.'/avatars/'.$this->avatar;
        }
        return '/img/no_avatar.jpg';
    }

    public function setAdminStatus()
    {
        $this->is_admin = 1;
        $this->save();
    }

    public function removeAdminStatus()
    {
        $this->is_admin = 0;
        $this->save();
    }

    public function ban()
    {
        $this->is_banned = 1;
        $this->save();
    }

    public function unban()
    {
        $this->is_banned = 0;
        $this->save();
    }   

    public static function createUserUploadFolder($user_id)
    {
        $dirname = '/storage/pictures/user'.$user_id;
        Storage::makeDirectory($dirname);
    }

    public function removeUserUploadFolder()
    {
        $dirname = '/storage/pictures/user'.$this->id;
        Storage::deleteDirectory($dirname);
    }

    public static function createApiAccess($key)
    {
        if(is_null($key)) {return null;}

        $user = User::where([
            ['uploadertoken', $key],
            ['is_banned', 0]
        ])->first();

        if(is_null($user)){return null;}

        return UserSession::create($user)->key;
    }

    public static function checkApiAccess(Request $request)
    {
        $user = UserSession::getUser($request->headers->get('X-Auth-Token'));
        if (is_null($user) || $user->is_banned == 1) return null;
        \Auth::loginUsingId($user->id);
        return $user;
    }

    public function getCreatedAtAttribute($value)
    {
        return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $value)->format('d.m.Y');;
    }

    public function getAvatarimageAttribute()
    {
        return $this->getAvatar();  
    }     
}
