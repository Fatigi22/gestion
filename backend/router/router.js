const express = require("express");
const Db = require('../model/models');
const router = express.Router();
const path = require("path");
const multer = require("multer");
const fs = require("fs");

// Vérifie si le dossier "image" existe, sinon le crée
const imageDir = path.join(__dirname, '../image');
if (!fs.existsSync(imageDir)) {
    fs.mkdirSync(imageDir, { recursive: true });
}

// Configuration de Multer pour le téléchargement de fichiers
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageDir); // Dossier de destination
    },
    filename: function (req, file, cb) {
        // Génère un nom de fichier unique avec un timestamp et une extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET request pour récupérer toutes les données
router.get("/A", (req, res) => {
    Db.find()
        .then(data => {
            console.log("Données récupérées avec succès");
            res.status(200).json(data);
        })
        .catch(error => {
            console.log("Erreur lors de la récupération des données :", error);
            res.status(500).send("Erreur lors de la récupération des données");
        });
});

// POST request pour insérer de nouvelles données
router.post("/post", upload.single("image"), (req, res) => {
    const { titre, description, prix, Quantity } = req.body;

    // Vérifie si tous les champs obligatoires sont présents
    if (!titre || !description || !prix || !Quantity) {
        return res.status(400).send("Tous les champs sont obligatoires");
    }

    // Vérifie que le prix et la quantité sont des nombres positifs
    if (isNaN(prix) || isNaN(Quantity) || prix < 0 || Quantity < 0) {
        return res.status(400).send("Le prix et la quantité doivent être des nombres positifs");
    }

    // Crée un nouvel objet avec les données
    const data = new Db({
        ima: req.file ? `/image/${req.file.filename}` : "", // Chemin de l'image si elle existe
        titre,
        description,
        prix: parseFloat(prix), // Convertir en nombre
        Quantity: parseInt(Quantity) // Convertir en entier
    });

    // Sauvegarde les données dans la base de données
    data.save()
        .then(() => {
            res.status(201).send("Données insérées avec succès");
        })
        .catch(error => {
            console.log("Erreur lors de l'insertion des données :", error);
            res.status(500).send("Erreur lors de l'insertion des données");
        });
});

// DELETE request pour supprimer des données par ID
router.delete("/:id", (req, res) => {
    const id = req.params.id; // Extrait l'ID des paramètres de la requête

    Db.deleteOne({ _id: id })
        .then(() => {
            console.log("Données supprimées avec succès");
            res.status(200).send("Données supprimées avec succès");
        })
        .catch(error => {
            console.log("Erreur lors de la suppression des données :", error);
            res.status(500).send("Erreur lors de la suppression des données");
        });
});

module.exports = router;