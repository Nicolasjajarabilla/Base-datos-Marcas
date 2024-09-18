import mongoose from "mongoose";

const marcasSchema = new mongoose.Schema({
  fabricante: String,
  modelos: [String],
  fecha: String,
  pais: String,
  logo: String,
});

export default mongoose.model("marcas-vehiculos", marcasSchema);
