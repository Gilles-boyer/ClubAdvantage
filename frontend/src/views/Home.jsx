import InvitationForm from '../components/InvitationForm'
import Offers from '../components/Offer/Offers'
import Statistique from '../components/Statistique'

export default function Home() {

  return ( 
    <>
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto mb-8 max-w-3xl text-center">
        <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
          Bienvenue sur votre espace <span className="text-indigo-800">ClubAdvantage</span>&nbsp;!
        </h3>
        <p className="text-gray-600 text-base leading-relaxed">
          Découvrez en un coup d’œil vos <strong>comités actifs</strong>, vos <strong>offres du moment</strong> et le nombre d’adhérents déjà inscrits.
          Grâce à notre tableau de bord interactif, vous gardez le contrôle et anticipez vos actions en toute simplicité.
          Plongez dès maintenant dans votre univers personnalisé et profitez pleinement de tous les avantages que nous vous offrons !
        </p>
      </div>

      {/* Sections Statistiques / Offres / Invitation */}
      <SectionTitle title="Statistiques" />
      <Statistique />

      <SectionTitle title="Les Offres Actuelles" />
      <Offers />

      <InvitationForm />
    </>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="flex items-center gap-6 mt-5 mb-4">
      <div className="flex-grow border-t border-neutral" />
      <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
      <div className="flex-grow border-t border-neutral" />
    </div>
  );
}