<?php

namespace App\Models\Exceptions;

use App\Models\Exceptions\Infrastructure\NotFoundException;


class ProblemDoesntExistException extends NotFoundException
{
    public function __construct($id)
    {
        parent::__construct("Problem with id " . $id . " doesn't exist");
    }
}
