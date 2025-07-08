<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use App\Http\Requests\CategoryRequest;
use App\Http\Resources\CategoryResource;


// ▸ BDD SQLite in-memory (RefreshDatabase) entre chaque test
// ▸ Aucun seed particulier : la table categories n’a pas de FK

class CategoryTest extends TestCase
{
    use RefreshDatabase;   // 🔄 reset DB between tests
    // 1. FACTORY
    /** @test Vérifie que la factory persiste bien un enregistrement */
    public function factory_creates_a_valid_record(): void
    {
        $category = Category::factory()->create();

        $this->assertDatabaseHas('categories', ['id' => $category->id]);
    }

    // 2. HTTP FORM REQUEST
    /** @test Charge utile valide → la validation doit passer */
    public function request_validation_passes_with_valid_data(): void
    {
        $payload   = Category::factory()->make()->toArray();
        $rules     = (new CategoryRequest)->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertTrue(
            $validator->passes(),
            'Le payload généré par la factory devrait être accepté par CategoryRequest'
        );
    }

    /** @test Champ « name » vide → la validation doit échouer */
    public function request_validation_fails_when_name_is_empty(): void
    {
        $payload   = Category::factory()->make(['name' => ''])->toArray();
        $rules     = (new CategoryRequest)->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertFalse($validator->passes(), 'La validation doit échouer si le nom est vide');
        $this->assertArrayHasKey('name', $validator->errors()->messages());
    }

    // 3. RESOURCE
    /** @test Le JSON retourné par CategoryResource contient bien les clés attendues */
    public function resource_returns_expected_shape(): void
    {
        $category = Category::factory()->create();
        $array    = (new CategoryResource($category))->resolve();

        $this->assertEqualsCanonicalizing(
            ['id', 'name', 'description', 'is_active'],
            array_keys($array),
            'Les clés du JSON ne correspondent pas au contrat de CategoryResource'
        );
    }
}
