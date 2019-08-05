<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\User;

class CreateAdmin extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {email : Account email} {pass : Account password}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create administrator account';

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
        $email = $this->argument('email');
        $pass = $this->argument('pass');

        $new_user = User::add([
            'name' => 'Admin',
            'email' => $email,
            'password' => $pass
        ]);
        $new_user->setAdminStatus();
    }
}
