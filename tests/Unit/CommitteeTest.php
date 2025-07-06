<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use App\Enums\RoleEnum;
use App\Models\{Role, User, Committee};
use App\Http\Requests\CommitteeRequest;
use App\Http\Resources\CommitteeResource;
use Illuminate\Database\Eloquent\Collection;

// ▸ Chaque test tourne dans une BDD SQLite in-memory (RefreshDatabase)
// ▸ On pré-seed le strict minimum : un rôle obligatoire + un user créateur

class CommitteeTest extends TestCase
{
    use RefreshDatabase;

    // Pré-seed (exécuté avant CHAQUE test)
    protected function setUp(): void
    {
        parent::setUp();

        // 1) Rôle “SUPER_ADMIN” (users.role_id est NOT-NULL)
        Role::factory()->create([
            'name'        => RoleEnum::SUPER_ADMIN->value,
            'description' => 'Compte super-admin utilisé pour les tests',
        ]);

        // 2) Utilisateur rattaché au rôle créé ci-dessus
        User::factory()->create([
            'role_id' => Role::first()->id,
        ]);
    }

    // 1. FACTORY
    // Vérifie que Committee::factory()->create() persiste bien un enregistrement
    public function test_a_committee_factory_creates_a_valid_record(): void
    {
        $committee = Committee::factory()->create();

        $this->assertDatabaseHas('committees', ['id' => $committee->id]);
    }

    // 2. RELATIONS
    // Les relations belongsTo / hasMany sont correctement configurées
    public function test_it_has_correct_relationships(): void
    {
        $committee = Committee::factory()->create();

        $this->assertNotNull($committee->creator,  'creator() doit renvoyer un User');
        // Facultatif : charge les collections si tu veux aller plus loin
        $this->assertInstanceOf(Collection::class, $committee->members);
    }

    // 3. VALIDATION
    //Le payload valide passe les règles de CommitteeRequest
    public function test_committee_request_validation_passes_with_valid_data(): void
    {
        $payload   = Committee::factory()->make()->toArray();
        $validator = Validator::make($payload, (new CommitteeRequest)->rules());

        $this->assertTrue($validator->passes(), 'La validation devrait passer');
    }

    //La validation échoue si “name” est vide
    public function test_committee_request_validation_fails_with_invalid_name(): void
    {
        $payload   = Committee::factory()->make(['name' => ''])->toArray();
        $validator = Validator::make($payload, (new CommitteeRequest)->rules());

        $this->assertFalse($validator->passes(), 'La validation doit échouer');
        $this->assertArrayHasKey('name', $validator->errors()->messages());
    }

    // 4. RESOURCE
    // Le shape du JSON retourné par CommitteeResource est conforme
    public function test_committee_resource_returns_expected_shape(): void
    {
        // On charge explicitement les relations utilisées par le Resource
        $committee = Committee::factory()
            ->create()
            ->load(['creator', 'members', 'offers']);

        $resource = (new CommitteeResource($committee))->resolve(); // => array()

        $this->assertEqualsCanonicalizing(
            [
                'id',
                'name',
                'agreement_start_date',
                'agreement_end_date',
                'auto_renew',
                'is_active',
                'created_by',
            ],
            array_keys($resource),
            'Les clés du JSON ne correspondent pas au contrat attendu'
        );
    }
}
