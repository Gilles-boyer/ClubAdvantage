import { isRouteErrorResponse, useRouteError } from "react-router-dom";

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
