import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        ima: '',
        titre: '',
        description: '',
        prix: '',
        Quantity: ''
    });

    const Datachange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const Data = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:3440/api/post', formData);
            if (response.status === 201) {
                setFormData({ ima: '', titre: '', description: '', prix: '', Quantity: '' });
            }
        } catch (error) {
            console.log("Error during data insertion:", error);
        }
    };

    return (
        <>
            <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
                <h1 className="text-xl font-bold text-white capitalize dark:text-white">Insertion des données</h1>
                <form onSubmit={Data}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-white dark:text-gray-200">Titre</label>
                            <input 
                                name="titre"
                                value={formData.titre}
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={Datachange} 
                            />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Description</label>
                            <input 
                                name="description"
                                value={formData.description}
                                type="text"
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                onChange={Datachange}
                            />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Prix</label>
                            <input 
                                name="prix"
                                type="number"
                                value={formData.prix}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                onChange={Datachange}
                            />
                        </div>

                        <div>
                            <label className="text-white dark:text-gray-200">Quantité</label>
                            <input 
                                name="Quantity"
                                type="number"
                                value={formData.Quantity}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                onChange={Datachange}
                            />
                        </div> 

                        <div>
                            <label className="block text-sm font-medium text-white">Image</label>
                            <input 
                                type="file" 
                                name="ima" 
                                className="mt-1" 
                                onChange={(e) => setFormData({ ...formData, ima: e.target.files[0] })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Contact;