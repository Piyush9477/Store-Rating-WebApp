import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';

export default function OwnerDashboard() {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        API.get('/owner/ratings').then(res => setStores(res.data));
    }, []);

    return (
        <div>
            <Navbar />
            <div className="container">
                <h3>Owner Dashboard: My Store Ratings</h3>
                {stores.length === 0 && <div>No store(s) found.</div>}
                {stores.map(store => (
                    <div key={store.storeName} className="mb-4">
                        <h5>{store.storeName} (Avg: {store.averageRating || "No ratings yet"})</h5>
                        <table className="table table-bordered">
                            <thead>
                                <tr><th>User</th><th>Rating</th></tr>
                            </thead>
                            <tbody>
                                {store.ratings.map((r, idx) => (
                                    <tr key={idx}><td>{r.userName}</td><td>{r.rating}</td></tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}
