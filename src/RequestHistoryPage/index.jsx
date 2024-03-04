import React from 'react';
import './styles.css'; // Import the CSS file with the styles

const RequestHistoryPage = () => {
    // Sample request data
    const requests = [
        { id: 1, item: 'Item 1', status: 'In Progress' },
        { id: 2, item: 'Item 2', status: 'Pending' },
        { id: 3, item: 'Item 3', status: 'Completed' },
       
    ];

    return (
        <div className="request-history-container">
            <h2>Request History</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Item</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request) => (
                        <tr key={request.id}>
                            <td>{request.id}</td>
                            <td>{request.item}</td>
                            <td className={request.status.toLowerCase()}>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RequestHistoryPage;
