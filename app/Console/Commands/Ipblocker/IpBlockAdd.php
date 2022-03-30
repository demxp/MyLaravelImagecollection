<?php

namespace App\Console\Commands\Ipblocker;

use Illuminate\Console\Command;
use App\IpBlock as IB;

class IpBlockAdd extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ipblock:add {ipaddr : IP Address}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Adding IP to blocktable';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $addr = $this->argument('ipaddr');

        if(!filter_var($addr, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)){
            $this->error('Entered IP Address:'.$addr.' is incorrect');
        }

        $find = IB::where('ipaddress', $addr);

        if($find->count() != 0){
            $this->error('Entered IP Address:'.$addr.' already used!');
        }

        $ins = IB::insert([
            'ipaddress' => $addr,
            'error_count' => 3,
            'created_at' => date(DATE_ATOM),
            'updated_at' => date(DATE_ATOM)
        ]);

        if($ins){
            $this->info('Address '.$addr.' succesfully added');
        }else{
            $this->error('Error Database');
        }
    }
}
