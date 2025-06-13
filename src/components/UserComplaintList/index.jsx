import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Icon from '../AppIcon'; 
import ComplaintCard from '../ComplaintCard';
import { useNavigate, useParams } from 'react-router-dom'; 

const UserComplaintList = ({ userId, onEditComplaint }) => {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
    // Get user from AuthContext
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUserComplaints = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/complaints/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComplaints(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserComplaints();
  }, [userId]);

  const handleEditComplaint = (complaint) => {
    if (onEditComplaint) {
      onEditComplaint(complaint);
    }
  };

  const handleDeleteComplaint = async (id) => {
    if (window.confirm(`Are you sure you want to delete complaint ${id}?`)) {
      try {
        const response = await fetch(`http://localhost:8080/api/complaints/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.ok) {
          alert('Complaint deleted successfully!');
          setComplaints(prevComplaints => prevComplaints.filter(complaint => complaint.id !== id));
        } else {
          const errorText = await response.text();
          alert(`Failed to delete complaint: ${response.status} ${response.statusText}. ${errorText}`);
        }
      } catch (error) {
        alert(`Network error: Could not connect to the server to delete complaint. ${error.message}`);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading your complaints...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-error">Error loading your complaints: {error}</div>;
  }

  if (complaints.length === 0) {
    return <div className="text-center py-8 text-text-secondary">You have not reported any complaints yet.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {complaints.map(complaint => (
        <ComplaintCard 
          key={complaint.id} 
          complaint={complaint} 
          onEdit={handleEditComplaint} 
          onDelete={handleDeleteComplaint}
        />
      ))}
    </div>
  );
};

export default UserComplaintList; 