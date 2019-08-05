<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserSession extends Model
{
    public function user()
    {
        return $this->hasOne(User::class, 'user_id');
    }

    public static function create(User $user)
    {
        $session = new static;
        $session->user_id = $user->id;
        $session->key = bcrypt($user->id.$user->password.time());
        $session->save();

        return $session;
    }

    /**
     * Получение пользователя по токену
     * @param  string $token API токен
     * @return object App\User or null
     */
    public static function getUser($token)
    {
        if(is_null($token)) return null;
        $session = self::where('key', $token)->first();
        if(is_null($session)) return null;
        return User::find($session->user_id);
    }   
}
