<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roleUser = Role::create([
            'name' => Role::ROLE_USER,
        ]);

        $roleAdmin = Role::create([
            'name' => Role::ROLE_ADMIN,
        ]);

        $roleAuthor = Role::create([
            'name' => Role::ROLE_AUTHOR,
        ]);

        $admin = User::create([
            'username' => 'admin',
            'email' => 'admin@admin.com',
            'password' => bcrypt('password'),
        ]);

        $admin->assignRole($roleUser);
        $admin->assignRole($roleAdmin);
        $admin->assignRole($roleAuthor);

        $user = User::create([
            'username' => 'user',
            'email' => 'user@user.com',
            'password' => bcrypt('password'),
        ]);

        $user->assignRole($roleUser);
    }
}
