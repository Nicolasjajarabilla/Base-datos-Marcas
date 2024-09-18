import express from "express";
import { Router } from "express";
import Marcas from "../models/marcas.model.js";

const router = Router();

// Middleware

const getMarcas = async (req, res, next) => {
  let marcas;
  const { id } = req.params;

  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ error: "ID no valido" });
  }

  try {
    marcas = await Marcas.findById(id);
    if (!marcas) {
      return res.status(404).json({ error: "Fabricante no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.Marcas = marcas;
  next();
};

// obtener todas los fabricantes (recursos)

router.get("/", async (req, res) => {
  try {
    const marcas = await Marcas.find();
    if (marcas.length === 0) {
      return res.status(204).json([]);
    }
    res.json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// crear un nuevo fabricante (recurso)

router.post("/", async (req, res) => {
  const { fabricante, modelos, fecha, pais, logo } = req?.body;
  if (!fabricante || !modelos || !fecha || !pais || !logo) {
    return res.status(400).json({
      error:
        "Faltan datos porque fabricante, modelos, fecha, pais y logo son obligatorios",
    });
  }

  const marcas = new Marcas({
    fabricante,
    modelos,
    fecha,
    pais,
    logo,
  });

  try {
    const newMarcas = await marcas.save();
    res.status(201).json(newMarcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
