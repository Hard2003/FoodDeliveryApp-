import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './MyOrder.css';

export default function MyOrder() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filter, setFilter] = useState('all');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyOrders();
        // eslint-disable-next-line
    }, []);

    const fetchMyOrders = async () => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/orders/my-orders', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'warning',
            'confirmed': 'info',
            'preparing': 'primary',
            'ready': 'success',
            'picked_up': 'info',
            'on_the_way': 'primary',
            'delivered': 'success',
            'cancelled': 'danger'
        };
        return colors[status] || 'secondary';
    };

    const getStatusIcon = (status) => {
        const icons = {
            'pending': 'clock',
            'confirmed': 'check-circle',
            'preparing': 'fire',
            'ready': 'box-seam',
            'picked_up': 'bicycle',
            'on_the_way': 'truck',
            'delivered': 'check-circle-fill',
            'cancelled': 'x-circle'
        };
        return icons[status] || 'circle';
    };

    const getStatusText = (status) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const filteredOrders = orders.filter(order => {
        if (filter === 'all') return true;
        if (filter === 'active') return !['delivered', 'cancelled'].includes(order.status);
        if (filter === 'completed') return order.status === 'delivered';
        if (filter === 'cancelled') return order.status === 'cancelled';
        return true;
    });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className="text-center mt-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="my-orders-container">
                <div className="container mt-4">
                    <h2 className="mb-4">My Orders</h2>

                    {/* Filter Tabs */}
                    <div className="order-filters mb-4">
                        <button 
                            className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                            onClick={() => setFilter('all')}
                        >
                            All Orders ({orders.length})
                        </button>
                        <button 
                            className={`btn ${filter === 'active' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                            onClick={() => setFilter('active')}
                        >
                            Active ({orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length})
                        </button>
                        <button 
                            className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed ({orders.filter(o => o.status === 'delivered').length})
                        </button>
                        <button 
                            className={`btn ${filter === 'cancelled' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setFilter('cancelled')}
                        >
                            Cancelled ({orders.filter(o => o.status === 'cancelled').length})
                        </button>
                    </div>

                    {/* Orders List */}
                    {filteredOrders.length === 0 ? (
                        <div className="empty-orders text-center py-5">
                            <i className="bi bi-receipt display-1 text-muted"></i>
                            <h4 className="mt-3">No orders found</h4>
                            <p className="text-muted">Start ordering delicious food!</p>
                            <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
                                Browse Restaurants
                            </button>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {filteredOrders.map((order) => (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <div className="row align-items-center">
                                            <div className="col-md-6">
                                                <h5 className="mb-1">{order.restaurant?.name || 'Restaurant'}</h5>
                                                <p className="text-muted small mb-0">
                                                    Order #{order._id.slice(-8).toUpperCase()}
                                                </p>
                                                <p className="text-muted small mb-0">{formatDate(order.createdAt)}</p>
                                            </div>
                                            <div className="col-md-6 text-md-end mt-2 mt-md-0">
                                                <span className={`badge bg-${getStatusColor(order.status)} order-status-badge`}>
                                                    <i className={`bi bi-${getStatusIcon(order.status)} me-1`}></i>
                                                    {getStatusText(order.status)}
                                                </span>
                                                <h5 className="mt-2 mb-0">₹{order.totalAmount?.toFixed(2)}</h5>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-items">
                                        <div className="row">
                                            <div className="col-md-8">
                                                <h6 className="mb-2">Items ({order.items?.length || 0})</h6>
                                                {order.items?.map((item, idx) => (
                                                    <div key={idx} className="order-item-row">
                                                        <span className="item-name">
                                                            {item.quantity}x {item.name || item.menuItem?.name}
                                                        </span>
                                                        {item.selectedVariant && (
                                                            <span className="text-muted small"> • {item.selectedVariant}</span>
                                                        )}
                                                        <span className="item-price ms-auto">₹{item.price?.toFixed(2)}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="col-md-4">
                                                <h6 className="mb-2">Delivery Address</h6>
                                                <p className="small text-muted mb-0">
                                                    {order.deliveryAddress?.houseNo}, {order.deliveryAddress?.street}, 
                                                    {order.deliveryAddress?.area}, {order.deliveryAddress?.city} - {order.deliveryAddress?.pincode}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="order-footer">
                                        <button 
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => setSelectedOrder(selectedOrder?._id === order._id ? null : order)}
                                        >
                                            {selectedOrder?._id === order._id ? 'Hide Details' : 'View Details'}
                                        </button>
                                        {!['delivered', 'cancelled'].includes(order.status) && (
                                            <button className="btn btn-sm btn-primary ms-2">
                                                Track Order
                                            </button>
                                        )}
                                        {order.status === 'delivered' && (
                                            <button className="btn btn-sm btn-success ms-2">
                                                Reorder
                                            </button>
                                        )}
                                    </div>

                                    {/* Order Timeline */}
                                    {selectedOrder?._id === order._id && (
                                        <div className="order-timeline mt-3 p-3 bg-light rounded">
                                            <h6 className="mb-3">Order Timeline</h6>
                                            <div className="timeline">
                                                {order.statusHistory?.map((history, idx) => (
                                                    <div key={idx} className="timeline-item">
                                                        <div className="timeline-marker">
                                                            <i className={`bi bi-${getStatusIcon(history.status)}`}></i>
                                                        </div>
                                                        <div className="timeline-content">
                                                            <strong>{getStatusText(history.status)}</strong>
                                                            <p className="text-muted small mb-0">
                                                                {formatDate(history.timestamp)}
                                                            </p>
                                                            {history.note && (
                                                                <p className="small mb-0">{history.note}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Delivery Partner Info */}
                                            {order.deliveryPartner && (
                                                <div className="delivery-partner-info mt-3 p-3 border rounded">
                                                    <h6>Delivery Partner</h6>
                                                    <p className="mb-1">
                                                        <strong>{order.deliveryPartner.name}</strong>
                                                    </p>
                                                    <p className="text-muted small mb-0">
                                                        <i className="bi bi-telephone me-2"></i>
                                                        {order.deliveryPartner.phone}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Payment Details */}
                                            <div className="payment-details mt-3 p-3 border rounded">
                                                <h6>Payment Details</h6>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Subtotal:</span>
                                                    <span>₹{(order.totalAmount - (order.deliveryFee || 0) - (order.taxAmount || 0)).toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Delivery Fee:</span>
                                                    <span>₹{(order.deliveryFee || 0).toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-1">
                                                    <span>Taxes:</span>
                                                    <span>₹{(order.taxAmount || 0).toFixed(2)}</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                    <strong>Total:</strong>
                                                    <strong>₹{order.totalAmount?.toFixed(2)}</strong>
                                                </div>
                                                <p className="text-muted small mt-2 mb-0">
                                                    Payment Method: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
