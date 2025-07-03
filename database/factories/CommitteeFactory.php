<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class CommitteeFactory extends Factory {
    
    public function definition(): array {

        $agreementStartDate = fake()->dateTimeBetween('0 years', 'now');

        return [
            'name'                  => fake()->unique()->company(),
            'agreement_start_date'  => $agreementStartDate,
            'agreement_end_date'    => Carbon::createFromDate($agreementStartDate->format('Y'),12,31),
            'auto_renew'            => fake()->boolean(90),

            // Sélectionne un user(staff[2] ou admin[1]) existant au hasard
            'created_by' => User::whereIn('role_name',[RoleEnum::SUPER_ADMIN->value, RoleEnum::STAFF->value])
                ->inRandomOrder()
                ->first()?->id,
            'is_active'  => fake()->boolean(90),
        ];
    }
}

