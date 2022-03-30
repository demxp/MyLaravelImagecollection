<?php

namespace App\Console\Commands\Ipblocker;

use Illuminate\Console\Command;
use App\IpBlock as IB;

class IpBlock extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ipblock';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Show blocked IP';

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
        $headers = ['IP Address', 'Date'];
         
        $addresses = IB::all(['ipaddress', 'updated_at'])->toArray();
        
        if(count($addresses) == 0){
            $this->info('IP table is empty');
        }else{
            $this->table($headers, $addresses);
        }
    }
}
