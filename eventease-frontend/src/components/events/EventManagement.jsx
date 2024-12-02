import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'react-toastify/dist/ReactToastify.css';


const eventSchema = Yup.object().shape({
    name: Yup.string().required('Event name is required'),
    description: Yup.string().required('Event description is required'),
    date: Yup.date()
        .required('Event date is required')
        .min(new Date().setHours(0, 0, 0, 0), 'Event date must be in the future'),
    location: Yup.string().required('Event location is required'),
    maxParticipants: Yup.number()
        .required('Max participants is required')
        .positive('Max participants must be a positive number')
        .integer('Max participants must be an integer'),
});



const EventManagement = () => {
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingEventId, setEditingEventId] = useState(null);
    const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
    const [eventToDelete, setEventToDelete] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
    } = useForm({
        resolver: yupResolver(eventSchema),
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

    const handleFormSubmit = async (data) => {
        try {
            if (isEditing) {
                await axiosInstance.patch(`/events/update/${editingEventId}`, data);
                toast.success('Event updated successfully');
            } else {
                await axiosInstance.post('/events/create', data);
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
        setValue('name', event.name);
        setValue('description', event.description);
        setValue('date', event.date.split('T')[0]);
        setValue('location', event.location);
        setValue('maxParticipants', event.maxParticipants);
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
        reset();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const openConfirmDeleteModal = (eventId) => {
        setEventToDelete(eventId);
        setIsConfirmDeleteModalOpen(true);
    };

    const closeConfirmDeleteModal = () => {
        setIsConfirmDeleteModalOpen(false);
        setEventToDelete(null);
    };

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

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Event' : 'Add Event'}</h2>

                        <form onSubmit={handleSubmit(handleFormSubmit)}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Name</label>
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Description</label>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <textarea
                                            {...field}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Date</label>
                                <Controller
                                    name="date"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="date"
                                            {...field}
                                            min={new Date().toISOString().split("T")[0]} 
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                            </div>


                            <div className="mb-4">
                                <label className="block text-gray-700">Location</label>
                                <Controller
                                    name="location"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Max Participants</label>
                                <Controller
                                    name="maxParticipants"
                                    control={control}
                                    render={({ field }) => (
                                        <input
                                            type="number"
                                            {...field}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    )}
                                />
                                {errors.maxParticipants && (
                                    <p className="text-red-500 text-sm">{errors.maxParticipants.message}</p>
                                )}
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

            {isConfirmDeleteModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this event?</h3>
                        <div className="flex justify-between">
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
