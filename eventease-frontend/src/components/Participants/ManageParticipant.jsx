import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const ManageParticipant = () => {
    const [participants, setParticipants] = useState([]);
    const [events, setEvents] = useState([]);
    const [formData, setFormData] = useState({ name: '', email: '', cin: '', event: '' });
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedParticipantId, setSelectedParticipantId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [participantsResponse, eventsResponse] = await Promise.all([
                    axiosInstance.get('/participants'),
                    axiosInstance.get('/events')
                ]);
                setParticipants(participantsResponse.data);
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Error fetching participants or events');
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEventChange = (e) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, event: value }));
    };

    const openModal = () => {
        setFormData({
            name: '',
            email: '',
            cin: '',
            event: '',
        });
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                const response = await axiosInstance.put(`/participants/update/${selectedParticipantId}`, formData);
                toast.success('Participant updated successfully');
    
                setParticipants((prevParticipants) =>
                    prevParticipants.map((participant) =>
                        participant._id === selectedParticipantId ? { ...participant, ...response.data } : participant
                    )
                );
            } else {
                const response = await axiosInstance.post('/participants/create', formData);
                toast.success('Participant created successfully');
    
                setParticipants((prev) => [...prev, response.data]);
            }
    
            closeModal();
        } catch (error) {
            toast.error('Error with participant operation');
            console.error(error);
        }
    };
    
    const handleEdit = (participant) => {
        setFormData({
            name: participant.name,
            email: participant.email,
            cin: participant.cin,
            event: participant.event._id,  
        });
        setSelectedParticipantId(participant._id);  
        setIsEditing(true);  
        setIsModalOpen(true);  
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Participant Management</h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={openModal}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    + Add Participant
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full table-auto text-sm text-left text-gray-700 bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">CIN</th>
                            <th className="px-6 py-4">Event</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant) => (
                            <tr key={participant._id} className="hover:bg-gray-100">
                                <td className="px-6 py-4">{participant.name}</td>
                                <td className="px-6 py-4">{participant.email}</td>
                                <td className="px-6 py-4">{participant.cin}</td>
                                <td className="px-6 py-4">{participant.event.name}</td>
                                <td className="px-6 py-4 flex justify-center space-x-3">
                                    <button
                                        onClick={() => handleEdit(participant)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{isUpdating ? 'Update Participant' : 'Create Participant'}</h2>
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 mb-6">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cin" className="block text-sm font-medium text-gray-700">CIN</label>
                                <input
                                    type="text"
                                    id="cin"
                                    name="cin"
                                    value={formData.cin}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="event" className="block text-sm font-medium text-gray-700">Event</label>
                                <select
                                    id="event"
                                    name="event"
                                    value={formData.event}
                                    onChange={handleEventChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select Event</option>
                                    {events.map((event) => (
                                        <option key={event._id} value={event._id}>
                                            {event.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-between">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                                >
                                    {isEditing ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageParticipant;
