<?php

namespace App;

use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
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
        $filename = str_random(10) . '.jpg';
        if (imagejpeg(imagecreatefromstring($decodedData), 'uploads/avatars/' . $filename)) {
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
            Storage::delete('uploads/avatars/'.$this->avatar);
        }
    }

    public function getAvatar()
    {
        if(!is_null($this->avatar)){
            return '/uploads/avatars/'.$this->avatar;
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
        $dirname = 'uploads/pictures/user'.$user_id;
        Storage::makeDirectory($dirname);
        Storage::makeDirectory($dirname.'/thumbnails');
    }

    public function removeUserUploadFolder()
    {
        $dirname = 'uploads/pictures/user'.$this->id;
        if(count(Storage::files($dirname)) == 0){
            Storage::deleteDirectory($dirname);
        }
    }

    public static function createApiAccess($key)
    {
        if(is_null($key)) {return null;}

        $user = User::where([
            ['uploadertoken', $key],
            ['is_banned', 0]
        ])->first();

        if(is_null($user)){return null;}

        return $user->email.":".password_hash($user->id, PASSWORD_DEFAULT);
    }

    public static function checkApiAccess(Request $request)
    {
        if(is_null($request->server('PHP_AUTH_USER')) || is_null($request->server('PHP_AUTH_PW'))){
            return null;
        }

        $email = $request->server('PHP_AUTH_USER');
        $token = $request->server('PHP_AUTH_PW');

        $user = User::where([
            ['email', $email],
            ['is_banned', 0]
        ])->first();  

        if(is_null($user) || !password_verify($user->id, $token)){return null;}

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
