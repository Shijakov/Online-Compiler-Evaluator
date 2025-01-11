<?php

namespace App\Models\Exceptions;

use App\Models\Exceptions\Infrastructure\NotFoundException;


class RoleDoesntExistException extends NotFoundException
{
    public function __construct(string $role)
    {
        parent::__construct("Role " . $role . " doesn't exist");
    }
}
