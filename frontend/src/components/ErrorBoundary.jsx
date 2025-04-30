import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Button from "./Button";

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <>
                <div className="p-10 text-center">
                    <h1 className="text-3xl font-bold">
                        {error.status} {error.statusText}
                    </h1>
                    <p>{error.data}</p>
                    <Button path={"/"} className="bg-secondary text-white mt-5 py-2 px-3 rounded" action="Retour à l'accueil"/>
                </div>
            </>
        );
    } else if (error instanceof Error) {
        return (
            <div>
                <h1>Erreur</h1>
                <p>{error.message}</p>
                <p>Stack trace :</p>
                <pre>{error.stack}</pre>
            </div>
        );
    } else {
        return <h1>Erreur inconnue</h1>;
    }
}
