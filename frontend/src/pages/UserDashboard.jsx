import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
    const [stores, setStores] = useState([]);
    const [search, setSearch] = useState('');
    const [ratingUpdates, setRatingUpdates] = useState({}); 

    useEffect(() => {
        API.get('/user/stores', { params: { search } }).then(res => setStores(res.data));
    }, [search]);

    const submitRating = async (storeId, rating) => {
        await API.post('/user/ratings', { store_id: storeId, rating: Number(rating) });
        setRatingUpdates({ ...ratingUpdates, [storeId]: rating }); 
        API.get('/user/stores', { params: { search } }).then(res => setStores(res.data));
    };

    return (
        <div>
            <Navbar />
            <div className="container">
                <h3>User Dashboard: Rate Stores</h3>
                <input
                    className="form-control mb-2"
                    placeholder="Search stores"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th><th>Address</th><th>Avg Rating</th><th>My Rating</th><th>Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.map(store => (
                            <tr key={store.id}>
                                <td>{store.name}</td>
                                <td>{store.address}</td>
                                <td>{store.averageRating || "No ratings yet"}</td>
                                <td>{store.myRating || "-"}</td>
                                <td>
                                    <select
                                        value={ratingUpdates[store.id] ?? store.myRating ?? ''}
                                        onChange={e => submitRating(store.id, e.target.value)}
                                    >
                                        <option value="">Rate</option>
                                        {[1,2,3,4,5].map(val => (
                                            <option key={val} value={val}>{val}</option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
