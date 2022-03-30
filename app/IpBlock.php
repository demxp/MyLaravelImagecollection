<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class IpBlock extends Model
{
    public $incrementing = false;

	const MAX_ERROR_COUNT = 3;
    
    public static function add($ip)
    {
    	$saved = self::where([
    		['ipaddress', $ip]
    	]);

    	if($saved->count() == 0){
    		self::insert([
    			'ipaddress' => $ip,
    			'error_count' => 1,
    			'created_at' => date(DATE_ATOM),
    			'updated_at' => date(DATE_ATOM)
    		]);
    	}else{
    		$saved->update(['error_count' => \DB::raw('error_count + 1')]);
    	}
    }
    
    public static function check($ip)
    {
    	$count = self::where([
    		['ipaddress', $ip],
    		['error_count', '>=', self::MAX_ERROR_COUNT]
    	])->count();

    	return $count == 0;
    }
}
