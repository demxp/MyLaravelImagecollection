<?php

namespace App;

use Illuminate\Support\Facades\Storage;
use Illuminate\Notifications\Notifiable;
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

    public function images()
    {
        return $this->hasMany(Images::class);
    }

    public function staticPages()
    {
        return $this->hasMany(StaticPages::class);
    }

    public static function add($fields)
    {
        $user = new static;
        $user->fill($fields);
        $user->password = bcrypt($fields['password']);
        $user->save();

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
        if (imagejpeg(imagecreatefromstring($decodedData), 'uploads/' . $filename)) {
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
            Storage::delete('uploads/'.$this->avatar);
        }
    }

    public function getAvatar()
    {
        if(!is_null($this->avatar)){
            return '/uploads/'.$this->avatar;
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
}
