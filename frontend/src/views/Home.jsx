import { useState, useEffect } from "react";
import InvitationForm from '../components/InvitationForm'
import Offers from '../components/Offer/Offers'
import Statistique from '../components/Statistique'
import { fetchQrCode } from "../services/qrService";

export default function Home() {
  const [qrUrl, setQrUrl] = useState(null);

  useEffect(() => {
    fetchQrCode()
      .then(url => setQrUrl(url))
      .catch(err => {
        console.error("Impossible de charger le QR-Code", err);
      });
  }, []);
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

      {/* Affichage du QR Code de l’utilisateur */}
      {qrUrl && (
        <div className="mx-auto mb-8 text-center">
          <h4 className="text-xl font-semibold mb-2">Votre QR Code personnel</h4>
          <img
            src={qrUrl}
            alt="Votre QR Code"
            className="inline-block border p-2 rounded shadow"
            width={200}
            height={200}
          />
        </div>
      )}

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