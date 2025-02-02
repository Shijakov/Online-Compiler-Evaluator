<?php

namespace App\Models;

use App\Models\Exceptions\RoleDoesntExistException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public const ROLE_USER = 'user';
    public const ROLE_ADMIN = 'admin';
    public const ROLE_AUTHOR = 'author';

    public function getId()
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public static function from(string $name): self
    {
        $role = Role::where('name', '=', $name)->first();
        if ($role === null) {
            throw new RoleDoesntExistException($name);
        }
        return $role;
    }
}
