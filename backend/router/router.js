const express = require("express");
const Db = require('../model/models');
const router = express.Router();

// GET request to fetch all data
router.get("/A", (req, res) => {
    Db.find()
        .then(data => {
            console.log("Data is running");
            res.status(200).json(data); // Return the fetched data
        })
        .catch(error => {
            console.log("Error fetching data:", error);
            res.status(500).send("Error fetching data");
        });
});

// POST request to insert new data
router.post("/post", (req, res) => {
    const { ima, titre, description, prix, Quantity } = req.body; // Corrected Qantety to Quantity

    // Check if all required fields are present
    if (!ima || !titre || !description || !prix || !Quantity) {
        return res.status(400).send({ message: "Tous les champs sont requis." });
    }

    const data = new Db({
        ima: ima,
        titre: titre,
        description: description,
        prix: prix,
        Quantity: Quantity // Corrected Qantety to Quantity
    });

    data.save()
        .then(() => {
            res.status(201).send("Données insérées avec succès");
        })
        .catch(error => {
            console.log("Erreur lors de l'insertion des données", error);
            res.status(500).send("Erreur lors de l'insertion des données");
        });
});

// DELETE request to remove data by ID
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Db.deleteOne({ _id: id })
        .then(() => {
            console.log("Données supprimées");
            res.status(200).send("Données supprimées avec succès");
        })
        .catch(error => {
            console.log("Erreur lors de la suppression:", error);
            res.status(500).send("Erreur lors de la suppression");
        });
});

module.exports = router;