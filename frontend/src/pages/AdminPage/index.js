import { AdminRoutes } from './AdminRoutes';
import MainLayout from '../../components/MainLayout';

function AdminPage() {
    return <MainLayout routes={AdminRoutes} />;
}

export default AdminPage;
