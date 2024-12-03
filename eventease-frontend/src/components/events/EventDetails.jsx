import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const EventDetails = () => {
    const { eventId } = useParams();  // Get eventId from the URL
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axiosInstance.get(`/events/${eventId}`);
                setEvent(response.data);
            } catch (error) {
                toast.error('Error fetching event details');
            }
        };

        fetchEventDetails();
    }, [eventId]);

    if (!event) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">{event.name}</h1>
            <p className="text-lg text-gray-700"><strong>Description: </strong>{event.description}</p>
            <p className="text-lg text-gray-700"><strong>Date: </strong>{new Date(event.date).toLocaleDateString()}</p>
            <p className="text-lg text-gray-700"><strong>Location: </strong>{event.location}</p>
            <p className="text-lg text-gray-700"><strong>Max Participants: </strong>{event.maxParticipants}</p>
        </div>
    );
};

export default EventDetails;
