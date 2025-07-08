<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Validator;
use App\Enums\RoleEnum;
use App\Models\{Role, User, Category, Offer};
use App\Http\Requests\OfferRequest;
use App\Http\Resources\OfferResource;

// ▸ Chaque test tourne dans une BDD SQLite in-memory (RefreshDatabase)  
// ▸ Les dépendances minimales (Role, Category, User) sont pré-seedées

class OfferTest extends TestCase
{
    use RefreshDatabase;   // 🔄 Remet la BDD à zéro entre chaque test

    // On crée ici les en-registrements indispensables pour qu’un Offer
    // « tienne » en base : un rôle (obligatoire car users.role_id NOT NULL),
    // une catégorie et un utilisateur créateur.
    protected function setUp(): void
    {
        parent::setUp();

        // 1) ➜ rôle « SUPER_ADMIN » (le plus simple pour les droits)
        Role::factory()->create([
            'name'        => RoleEnum::SUPER_ADMIN->value,
            'description' => 'Compte super-admin utilisé dans les tests',
        ]);

        // 2) ➜ une catégorie générique pour que Offer::factory() soit valide
        Category::factory()->create();

        // 3) ➜ un utilisateur rattaché au rôle ci-dessus
        User::factory()->create([
            'role_id' => Role::first()->id,   // le rôle que l’on vient de créer
        ]);
    }

    // 1/ FACTORY
    // Vérifie qu’Offer::factory()->create() persiste bien un enregistrement
    public function test_factory_validation(): void
    {
        $offer = Offer::factory()->create();

        // On s’assure que l’ID existe bien dans la table « offers »
        $this->assertDatabaseHas('offers', ['id' => $offer->id]);
    }

    // 2/ RELATIONS
    // Vérifie les relations belongsTo/… configurées sur Offer
    public function test_relationships_validation(): void
    {
        $offer = Offer::factory()->create();

        $this->assertNotNull($offer->creator,  'creator() doit renvoyer un User');
        $this->assertNotNull($offer->category, 'category() doit renvoyer une Category');
    }

    // 3/ VALIDATION REQUEST
    // Le payload valide passe la validation (OfferRequest)
    public function test_request_validation(): void
    {
        // make() = objet non sauvegardé, toArray() = payload brut
        $payload   = Offer::factory()->make()->toArray();
        $rules     = (new OfferRequest)->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertTrue($validator->passes(), 'La validation devrait passer');
    }

    // La validation échoue si « title » est vide
    public function test_request_title_validation(): void
    {
        $payload   = Offer::factory()->make(['title' => ''])->toArray(); // <- titre invalide
        $rules     = (new OfferRequest)->rules();
        $validator = Validator::make($payload, $rules);

        $this->assertFalse($validator->passes(), 'La validation doit échouer');
        $this->assertArrayHasKey('title', $validator->errors()->messages(), 'Erreur sur le champ title attendue');
    }


    // 4/ RESOURCE
    // Le shape (clés) du JSON retourné par OfferResource est conforme
    public function test_resource_validation(): void
    {
        // On charge explicitement les relations car le Resource les utilise
        $offer    = Offer::factory()->create()->load(['creator', 'category', 'committees']);
        $resource = (new OfferResource($offer))->resolve();  // ->array()

        $this->assertEqualsCanonicalizing(
            [
                'id',
                'title',
                'description',
                'is_active',
                'created_by',
                'category_id',
                'creator_name',
                'category_name',
                'committees',
            ],
            array_keys($resource),
            'Les clés du JSON ne correspondent pas au contrat attendu'
        );
    }
}


/** @test */
// public function relationships_validation(): void { … }