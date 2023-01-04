import { DataGrid } from '@mui/x-data-grid';
import { hospitalColumns, donorColumns, recipientColumns } from '../../services/data';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './DataTable.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDonor } from '../../redux/actions/donorManage';
import { fetchAllRecipient } from '../../redux/actions/recipientManage';
import { deleteUser, fetchAllHospital, fetchHospitalById } from '../../redux/actions/hospitalManage';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BeatLoader from 'react-spinners/BeatLoader';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CsvBuilder } from 'filefy';

const DataTable = (props) => {
    let columns = [];
    let listUsers = [];
    let title = '';

    const dispatch = useDispatch();
    const listHospitals = useSelector((state) => state.users.listHospitals);
    const listDonors = useSelector((state) => state.users.listDonors);
    const listRecipients = useSelector((state) => state.users.listRecipients);
    const isLoading = useSelector((state) => state.users.isLoading);
    useEffect(() => {
        switch (props.role) {
            case 'donor':
                dispatch(fetchAllDonor());
                break;
            case 'recipient':
                dispatch(fetchAllRecipient());
                break;
            case 'hospital':
                dispatch(fetchAllHospital());
                break;
            default:
                break;
        }
    }, []);

    switch (props.role) {
        case 'donor':
            title = 'thông tin người hiến máu';
            listUsers = listDonors;
            columns = donorColumns;
            break;
        case 'recipient':
            title = 'thông tin người nhận máu';
            listUsers = listRecipients;
            columns = recipientColumns;
            break;
        case 'hospital':
            title = 'thông tin bệnh viện';
            listUsers = listHospitals;
            columns = hospitalColumns;
            break;
        default:
            break;
    }

    const handleDelete = (id) => {
        if (window.confirm(`Bạn có chắc chắn muốn xoá!`) === true) {
            dispatch(deleteUser(id));
        }
    };

    const actionColumn = [
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <NavLink
                            to={`/admin/manage_${props.role}/viewUser/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="viewButton">
                                <VisibilityIcon />
                            </div>
                        </NavLink>
                        <NavLink
                            to={`/admin/manage_${props.role}/editUser/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="editButton">
                                <EditIcon />
                            </div>
                        </NavLink>
                        <div
                            className="deleteButton"
                            onClick={() => {
                                handleDelete(params.row.id);
                            }}
                        >
                            <DeleteIcon />
                        </div>
                    </div>
                );
            },
        },
    ];

    const [query, setQuery] = useState('');
    const [status, setStatus] = useState('');
    const search = (data) => {
        return data?.filter(
            (user) =>
                user.email.toLowerCase().includes(query) ||
                user.firstName?.toLowerCase().includes(query) ||
                user.lastName?.toLowerCase().includes(query) ||
                user.hospitalName?.toLowerCase().includes(query) ||
                user.groupBlood?.toLowerCase().includes(query),
        );
    };

    const filter = (data) => {
        if (status === '') return data;
        return data.filter((user) => user.status === status);
    };

    const exportAllRows = () => {
        var csvBuilder = new CsvBuilder('user_list.csv')
            .setColumns(columns.map((col) => col.field))
            .addRows(listUsers.map((row) => columns.map((col) => row[col.field])))
            .exportFile();
    };

    return (
        <div className="datatable">
            <div className="datatableTitle">
                Quản lý {title}
                {props.role === 'hospital' && (
                    <NavLink to="/admin/manage_hospital/addUser" className="link">
                        Thêm mới
                    </NavLink>
                )}
            </div>
            <div className="admin-search-area">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-admin"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            <div className="admin-tools">
                <div className="admin-filter">
                    <h3>Filter by status</h3>
                    <button className="filter-active" onClick={() => setStatus('active')}>
                        Active
                    </button>
                    <button className="filter-inactive" onClick={() => setStatus('inactive')}>
                        Inactive
                    </button>
                    <button className="filter-reset" onClick={() => setStatus('')}>
                        Reset
                    </button>
                </div>
                <div className="admin-export">
                    <button onClick={exportAllRows}>
                        <SaveAltIcon />
                        Export CSV
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className="datatable-spinner">
                    <BeatLoader color="#36d7b7" size={10} aria-label="Loading Spinner" data-testid="loader" />
                </div>
            ) : (
                <DataGrid
                    className="datagrid"
                    rows={filter(search(listUsers)) || []}
                    columns={columns.concat(actionColumn)}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    checkboxSelection
                />
            )}
        </div>
    );
};

export default DataTable;
