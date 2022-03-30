<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Storage;

class Music extends Model
{
    protected $fillable = ['title', 'artist', 'album'];
    protected $appends = ['filelink'];

    const MUSIC_FOLDER = '/storage/music';

    public static function add($request)
    {
    	$mfile = new static;
    	$mfile->owner = \Auth::user()->id;
        $mfile->title = $request->get('title');
        $mfile->artist = $request->get('artist') ?? '';
        $mfile->album = $request->get('album') ?? '';

        try {
            $saved_file = self::saveFile($request);
            if(!$saved_file->status){
                throw new \Exception("Filesave error");
            }        
            $mfile->filename = $saved_file->filename;
            $mfile->save();
            return [
                "status" => "ok",
                "data" => $mfile
            ];
        } catch (\Throwable $e) {
            return [
                "status" => "error",
                "message" => $e->getMessage()
            ];
        }
    }

    public function edit($fields)
    {
    	$this->fill($fields);
        try {
            $this->save();
            return ["status" => "ok"];
        } catch (\Throwable $e) {
            return [
                "status" => "error",
                "message" => $e->getMessage()
            ];        
        }        
    }

    public static function saveFile($request){
        $filename = '';

        do{
            $filename = md5(uniqid()).'.mp3';
        }while(Storage::exists(self::MUSIC_FOLDER.'/'.$filename));
        
        $path = Storage::putFileAs(self::MUSIC_FOLDER, $request->file('file'), $filename);

        return (object)[
            'filename'  => $filename,
            'status'    => $path
        ];
    }

    public function remove()
    {
        try {
            Storage::delete(self::MUSIC_FOLDER.'/'.$this->filename);
            $this->delete();
            return ["status" => "ok"];
        } catch (\Throwable $e) {
            return [
                "status" => "error",
                "message" => $e->getMessage()
            ];        
        }          
    }    

    public function getFilelinkAttribute()
    {
        return Storage::url('music/'.$this->filename);
    }    
}
