import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

// Tes selectors + thunks — adapte les chemins si besoin
import { fetchCmmtts, listOfCommittees }    from "../store/slices/committeeSlice";
import { fetchOffers,     listOfOffers }        from "../store/slices/offerSlice";
import { fetchUsers,      listOfUsers }         from "../store/slices/userSlice";
import { fetchScans,      listOfScans }         from "../store/slices/scanSlice";

export default function Statistique() {
    const dispatch = useDispatch();

    // on récupère toutes les données
    const committees = useSelector(listOfCommittees);
    const offers     = useSelector(listOfOffers);
    const users      = useSelector(listOfUsers);
    const scans      = useSelector(listOfScans);

    // on charge tout au montage
    useEffect(() => {
        dispatch(fetchCmmtts());
        dispatch(fetchOffers());
        dispatch(fetchUsers());
        dispatch(fetchScans());
    }, [dispatch]);

    // on mémorise les calculs pour ne pas recalculer à chaque render
    const stats = useMemo(() => {
        const now = new Date();
        const currentYear  = now.getFullYear();
        const currentMonth = now.getMonth();

        // nombre de CSE actifs
        const cseActifs = committees.filter(c => c.is_active).length;

        // nombre d'offres actives
        const offresActives = offers.filter(o => o.is_active).length;

        // nombre d'adherents actifs
        const adherents = users.filter(u =>
            u.status === "active"
            && !["super_admin","staff"].includes(u.role_name)
        ).length;

        // scans du mois courant
        const scansThisMonth = scans.filter(s => {
        const d = new Date(s.date || s.scanned_at);
        return d.getFullYear() === currentYear
            && d.getMonth()    === currentMonth;
        }).length;

        return { cseActifs, offresActives, adherents, scansThisMonth };
    }, [committees, offers, users, scans]);
    
    return (
        <section className="text-gray-700 body-font">
            <div className="container px-5 py-5 mx-auto">
                <div className="flex flex-wrap -m-4 text-center">

                    {/* CSE actifs */}
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                            <svg
                                fill="none" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                                viewBox="0 0 24 24"
                            >
                                <path d="M3 18v-6a9 9 0 0118 0v6"></path>
                                <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">
                                {stats.cseActifs}
                            </h2>
                            <p className="leading-relaxed">CSE actifs</p>
                        </div>
                    </div>

                    {/* Offres actives */}
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                            <svg
                                fill="none" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">
                                {stats.offresActives}
                            </h2>
                            <p className="leading-relaxed">Offres actives</p>
                        </div>
                    </div>

                    {/* Adhérents */}
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                            <svg
                                fill="none" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                                viewBox="0 0 24 24"
                                >
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">
                                {stats.adherents}
                            </h2>
                            <p className="leading-relaxed">Adhérents</p>
                        </div>
                    </div>

                    {/* Scans ce mois */}
                    <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                        <div className="border-2 border-gray-600 px-4 py-6 rounded-lg transform transition duration-500 hover:scale-110">
                            <svg
                                fill="none" stroke="currentColor"
                                strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                className="text-indigo-500 w-12 h-12 mb-3 inline-block"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 17l4 4 4-4m-4-5v9"></path>
                                <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                            </svg>
                            <h2 className="title-font font-medium text-3xl text-gray-900">
                                {stats.scansThisMonth}
                            </h2>
                            <p className="leading-relaxed">Scans du mois</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// petit helper pour formater “2.7K” 
// const fmt = n => n > 999 ? (n/1000).toFixed(1)+"K" : n;
