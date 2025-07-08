<?php

namespace App\Enums;

enum RoleEnum: string
{
    case SUPER_ADMIN = 'super_admin';
    case STAFF       = 'staff';
    case CSE_ADMIN   = 'cse_admin';
    case CSE_MEMBER  = 'cse_member';
}
