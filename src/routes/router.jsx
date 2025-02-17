import App from '../layouts/App'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'
import NotFound from '../pages/NotFound'
import Profile from '../pages/Profile'

/**
 * Router component. Defines the application routes.
 *
 * @returns {JSX.Element} The Router component.
 */
export function Router() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <App />,
            children: [
                {
                    path: '/',
                    element: <Navigate to="/user/12" />, // Redirection temporaire vers l'utilisateur avec l'ID 12
                },
                {
                    path: '/user/:id',
                    element: <Profile />,
                },
                {
                    path: '/404',
                    element: <NotFound />,
                },
                {
                    path: '*', // Pour toutes les autres routes non définies
                    element: <NotFound />,
                },
            ],
        },
    ])
    return <RouterProvider router={router} />
}
