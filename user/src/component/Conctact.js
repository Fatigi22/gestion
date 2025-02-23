import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [product, setProduct] = useState({
    titre: "",
    description: "",
    prix: "",
    Quantity: "",
  });

  const [ima, setIma] = useState(null);

  // Gestion des changements dans les champs de texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Gestion du téléchargement de l'image
  const handleImageChange = (e) => {
    setIma(e.target.files[0]);
  };

  // Gestion de la soumission du formulaire
  const handleClick = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    console.log("Formulaire soumis");

    // Validation des champs obligatoires
    if (!product.titre || !product.description || !product.prix || !product.Quantity) {
      alert("Tous les champs sont obligatoires");
      return;
    }

    // Vérification que le prix et la quantité sont des nombres positifs
    if (isNaN(product.prix) || isNaN(product.Quantity) || product.prix < 0 || product.Quantity < 0) {
      alert("Le prix et la quantité doivent être des nombres positifs");
      return;
    }

    // Création de l'objet FormData pour envoyer les données
    const formData = new FormData();
    formData.append("titre", product.titre);
    formData.append("description", product.description);
    formData.append("prix", product.prix);
    formData.append("Quantity", product.Quantity);

    if (ima) {
      formData.append("image", ima); // Ajoute l'image si elle existe
      console.log("Image ajoutée :", ima);
    } else {
      console.log("Aucune image sélectionnée.");
    }

    try {
      console.log("Envoi des données à l'URL : http://127.0.0.1:3440/api/post");

      // Envoi des données au backend
      const response = await axios.post("http://127.0.0.1:3440/api/post", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Réponse du serveur :", response.data);

      // Réinitialisation du formulaire après une soumission réussie
      setProduct({ titre: "", description: "", prix: "", Quantity: "" });
      setIma(null);
      alert("Produit enregistré avec succès !"); // Message de succès
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit :", error);

      // Affichage d'un message d'erreur spécifique
      if (error.response) {
        alert(`Erreur du serveur : ${error.response.data.message || "Veuillez réessayer."}`);
      } else if (error.request) {
        alert("Erreur réseau : Impossible de se connecter au serveur.");
      } else {
        alert("Erreur inattendue : Veuillez réessayer.");
      }
    }
  };

  return (
    <>
      <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md dark:bg-gray-800 mt-20">
        <h1 className="text-xl font-bold text-white capitalize dark:text-white">
          Insertion des données
        </h1>
        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            {/* Champ Titre */}
            <div>
              <label className="text-white dark:text-gray-200">Titre</label>
              <input
                name="titre"
                value={product.titre}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />
            </div>

            {/* Champ Description */}
            <div>
              <label className="text-white dark:text-gray-200">Description</label>
              <input
                name="description"
                value={product.description}
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />
            </div>

            {/* Champ Prix */}
            <div>
              <label className="text-white dark:text-gray-200">Prix</label>
              <input
                name="prix"
                type="number"
                value={product.prix}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />
            </div>

            {/* Champ Quantité */}
            <div>
              <label className="text-white dark:text-gray-200">Quantité</label>
              <input
                name="Quantity"
                type="number"
                value={product.Quantity}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                onChange={handleChange}
              />
            </div>

            {/* Champ Image */}
            <div>
              <label className="block text-sm font-medium text-white">Image</label>
              <input
                type="file"
                name="ima"
                className="mt-1"
                onChange={handleImageChange}
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className="flex justify-end mt-6">
            <button
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600"
              onClick={handleClick}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Contact;