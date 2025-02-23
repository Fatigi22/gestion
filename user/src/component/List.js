import React, { useEffect, useState } from "react";
import axios from "axios";

function List() {
  const [data, setData] = useState([]);

  // Fonction pour récupérer les données
  const afficher = async () => {
    try {
      const response = await axios.get("http://localhost:3440/api/A");
      setData(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  // Fonction pour supprimer une donnée
  const deletdata = async (id) => {
    try {
      await axios.delete(`http://localhost:3440/api/${id}`);
      afficher(); // Rafraîchir les données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    afficher();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">Image</th>
            <th scope="col" className="px-6 py-3">Titre</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Prix</th>
            <th scope="col" className="px-6 py-3">Quantité</th>
            <th scope="col" className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr
              key={product._id} // Utiliser _id comme clé unique
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-table-search-${product._id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor={`checkbox-table-search-${product._id}`}
                    className="sr-only"
                  >
                    checkbox
                  </label>
                </div>
              </td>
              <td className="px-6 py-4">
                <img src={`http://localhost:3440${product.ima}`} alt={product.titre} className="w-16 h-16" />
              </td>
              <td className="px-6 py-4">{product.titre}</td> {/* Utiliser product.titre */}
              <td className="px-6 py-4">{product.description}</td>
              <td className="px-6 py-4">{product.prix}</td>
              <td className="px-6 py-4">{product.Quantity}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Modifier
                </a>
                <button
                  onClick={() => deletdata(product._id)}
                  className="ml-2 text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav
        className="flex items-center flex-col flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Affichage{" "}
          <span className="font-semibold text-gray-900 dark:text-white">1-10</span>{" "}
          sur <span className="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Précédent
            </a>
          </li>
          {[1, 2, 3, 4, 5].map((page) => (
            <li key={page}>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  page === 3
                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }`}
              >
                {page}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              Suivant
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default List;