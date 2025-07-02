import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStatsThunk,
  selectStats,
  selectStatsStatus,
  selectStatsError,
} from "../store/slices/statsSlice";

export default function Statistique() {
  const dispatch = useDispatch();
  const stats    = useSelector(selectStats);
  const status   = useSelector(selectStatsStatus);
  const error    = useSelector(selectStatsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchStatsThunk());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <p className="text-center py-8">Chargement des statistiques…</p>;
  }

  if (status === "failed") {
    return (
      <p className="text-center py-8 text-red-600">
        Erreur de chargement : {error}
      </p>
    );
  }

  if (!stats) {
    return null; // ou un placeholder si tu préfères
  }

  const { cseActifs, offresActives, adherents, scansThisMonth } = stats;

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4 text-center">

          <StatCard
            value={cseActifs}
            label="CSE actifs"
            icon="M3 18v-6a9 9 0 0118 0v6 M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"
          />

          <StatCard
            value={offresActives}
            label="Offres actives"
            icon="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
          />

          <StatCard
            value={adherents}
            label="Adhérents"
            icon="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 11a4 4 0 100-8 4 4 0 000 8 M23 21v-2a4 4 0 00-3-3.87"
          />

          <StatCard
            value={scansThisMonth}
            label="Scans du mois"
            icon="M8 17l4 4 4-4m-4-5v9 M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"
          />

        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
      <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="text-indigo-500 w-12 h-12 mb-3 inline-block"
          viewBox="0 0 24 24"
        >
          <path d={icon} />
        </svg>
        <h2 className="title-font font-medium text-3xl text-gray-900">
          {value}
        </h2>
        <p className="leading-relaxed">{label}</p>
      </div>
    </div>
  );
}

// Version d'avant :
// return (
//         <section className="text-gray-700 body-font">
//             <div className="container px-5 py-5 mx-auto">
//                 <div className="flex flex-wrap -m-4 text-center">

//                     {/* CSE actifs */}
//                     <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
//                         <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
//                             <svg
//                                 fill="none" stroke="currentColor"
//                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                 className="text-indigo-500 w-12 h-12 mb-3 inline-block"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path d="M3 18v-6a9 9 0 0118 0v6"></path>
//                                 <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"></path>
//                             </svg>
//                             <h2 className="title-font font-medium text-3xl text-gray-900">
//                                 {stats.cseActifs}
//                             </h2>
//                             <p className="leading-relaxed">CSE actifs</p>
//                         </div>
//                     </div>

//                     {/* Offres actives */}
//                     <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
//                         <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
//                             <svg
//                                 fill="none" stroke="currentColor"
//                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                 className="text-indigo-500 w-12 h-12 mb-3 inline-block"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//                             </svg>
//                             <h2 className="title-font font-medium text-3xl text-gray-900">
//                                 {stats.offresActives}
//                             </h2>
//                             <p className="leading-relaxed">Offres actives</p>
//                         </div>
//                     </div>

//                     {/* Adhérents */}
//                     <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
//                         <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
//                             <svg
//                                 fill="none" stroke="currentColor"
//                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                 className="text-indigo-500 w-12 h-12 mb-3 inline-block"
//                                 viewBox="0 0 24 24"
//                                 >
//                                 <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
//                                 <circle cx="9" cy="7" r="4"></circle>
//                                 <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
//                             </svg>
//                             <h2 className="title-font font-medium text-3xl text-gray-900">
//                                 {stats.adherents}
//                             </h2>
//                             <p className="leading-relaxed">Adhérents</p>
//                         </div>
//                     </div>

//                     {/* Scans ce mois */}
//                     <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
//                         <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
//                             <svg
//                                 fill="none" stroke="currentColor"
//                                 strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                 className="text-indigo-500 w-12 h-12 mb-3 inline-block"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path d="M8 17l4 4 4-4m-4-5v9"></path>
//                                 <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
//                             </svg>
//                             <h2 className="title-font font-medium text-3xl text-gray-900">
//                                 {stats.scansThisMonth}
//                             </h2>
//                             <p className="leading-relaxed">Scans du mois</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
