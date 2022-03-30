<?php

namespace App\Console\Commands\Ipblocker;

use Illuminate\Console\Command;
use App\IpBlock as IB;

class IpBlockRemove extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ipblock:remove {ipaddr : IP Address}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Remove blocked IP';

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

        if($find->count() == 0){
            $this->error('Entered IP Address:'.$addr.' not found!');
        }

        if($find->delete()){
            $this->info('Address '.$addr.' succesfully removed');
        }else{
            $this->error('Error Database');
        }
    }
}
