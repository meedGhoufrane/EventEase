import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [viewDetailsModalOpen, setViewDetailsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        maxParticipants: 0
    });



    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axiosInstance.get('/events');
            setEvents(response.data);
        } catch (error) {
            toast.error('Error fetching events');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axiosInstance.patch(`/events/update/${editingEventId}`, formData);
                toast.success('Event updated successfully');
            } else {
                await axiosInstance.post('/events/create', formData);
                toast.success('Event created successfully');
            }
            fetchEvents();
            closeModal();
        } catch (error) {
            toast.error('Error creating/updating event');
        }
    };

    const handleEdit = (event) => {
        setIsEditing(true);
        setEditingEventId(event._id);
        setFormData({
            name: event.name,
            description: event.description,
            date: event.date.split('T')[0],
            location: event.location,
            maxParticipants: event.maxParticipants,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/events/delete/${eventToDelete}`);
            toast.success('Event deleted successfully');
            fetchEvents();
            closeConfirmDeleteModal();
        } catch (error) {
            toast.error('Error deleting event');
        }
    };

    const openModal = () => {
        setFormData({
            name: '',
            description: '',
            date: '',
            location: '',
            maxParticipants: '',
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openConfirmDeleteModal = (eventId) => {
        setEventToDelete(eventId);
        setIsConfirmDeleteModalOpen(true);
    };

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
        setEventToDelete(null);
    };


    const closeViewDetailsModal = () => {
        setViewDetailsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleViewDetails = async (eventId) => {
        try {
            const response = await axiosInstance.get(`/events/${eventId}`);
            console.log('Event details:', response.data);
            setSelectedEvent(response.data);
            setViewDetailsModalOpen(true);
        } catch (error) {
            console.error('Error fetching event details:', error);
            toast.error('Error fetching event details');
        }
    };

    console.log(selectedEvent);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Event Management</h1>

            <div className="flex justify-end mb-4">
                <button
                    onClick={openModal}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
                >
                    + Add Event
                </button>
            </div>

            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="w-full table-auto text-sm text-left text-gray-700 bg-white">
                    <thead className="text-xs uppercase bg-gray-100 text-gray-500">
                        <tr>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Max Participants</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr
                                key={event._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition duration-300 ease-in-out"
                            >
                                <td className="px-6 py-4">{event.name}</td>
                                <td className="px-6 py-4 text-gray-600">{event.description}</td>
                                <td className="px-6 py-4">{new Date(event.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4">{event.location}</td>
                                <td className="px-6 py-4">{event.maxParticipants}</td>
                                <td className="px-6 py-4 flex justify-center space-x-3">
                                    <button
                                        onClick={() => handleViewDetails(event._id)}
                                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => openConfirmDeleteModal(event._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* View Details Modal */}
            {viewDetailsModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 overflow-y-auto max-h-[80vh]">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Event Details</h2>

                        <div className="space-y-4">
                            <div className="flex flex-col">
                                <strong className="text-gray-700">Name:</strong>
                                <p className="text-gray-800">{selectedEvent.event.name}</p>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-gray-700">Description:</strong>
                                <p className="text-gray-800">{selectedEvent.event.description}</p>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-gray-700">Date:</strong>
                                <p className="text-gray-800">{new Date(selectedEvent.event.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-gray-700">Location:</strong>
                                <p className="text-gray-800">{selectedEvent.event.location}</p>
                            </div>
                            <div className="flex flex-col">
                                <strong className="text-gray-700">Max Participants:</strong>
                                <p className="text-gray-800">{selectedEvent.event.maxParticipants}</p>
                            </div>

                            <div className="mt-6">
                                <strong className="text-gray-700 text-lg block mb-3">Participants:</strong>
                                {selectedEvent.participants && selectedEvent.participants.length > 0 ? (
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr>
                                                    <th className="text-left text-gray-600 pb-2">Name</th>
                                                    <th className="text-left text-gray-600 pb-2">Email</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedEvent.participants.map((participant, index) => (
                                                    <tr key={participant._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                                        <td className="py-2 px-2">{participant.name}</td>
                                                        <td className="py-2 px-2">{participant.email}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 italic">No participants registered yet</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-between mt-6">
                            <button
                                onClick={() => window.print()}
                                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors duration-300"
                            >
                                Print
                            </button>

                            <button
                                onClick={closeViewDetailsModal}
                                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}



            {/* Existing Modals (Add/Edit/Delete) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Event' : 'Add Event'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Description Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                />
                            </div>

                            {/* Date Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Location Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Location</label>
                                <input
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Max Participants Input */}
                            <div className="mb-4">
                                <label className="block text-gray-700">Max Participants</label>
                                <input
                                    type="number"
                                    name="maxParticipants"
                                    value={formData.maxParticipants}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            {/* Form Submit and Cancel Buttons */}
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


            {isConfirmDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 text-center">
                        <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                        <p>Are you sure you want to delete this event?</p>
                        <div className="flex justify-center mt-6 space-x-4">
                            <button
                                onClick={closeConfirmDeleteModal}
                                className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventManagement;
