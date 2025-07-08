<?php

namespace Database\Factories;

use App\Enums\RoleEnum;
use App\Models\Category;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class OfferFactory extends Factory {

    protected $model = Offer::class;

    public function definition(): array {
        return [
            'title'      => fake()->sentence(3),
            'description'=> fake()->paragraph(),
            'is_active'  => fake()->boolean(90),
            'created_by' => User::whereIn('role_name',[RoleEnum::SUPER_ADMIN->value, RoleEnum::STAFF->value])
                            ->inRandomOrder()
                            ->first()?->id, 
            'category_id'=> Category::inRandomOrder()->value('id'),
            // 'category_name' => Category::factory(),
        ];
    }
}

