import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
const port = 5000;

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  // res.json({ filePath: req.file.path });
  if (req.file) {
    const filePath = path.join(__dirname, "uploads", req.file.filename);

    // Write the file path to filename.txt
    const fileNameTxtPath = path.join(__dirname, "filename.txt");
    fs.writeFile(fileNameTxtPath, filePath, (err) => {
      if (err) {
        console.error("Error writing to filename.txt:", err);
        return res.status(500).json({ success: false, message: "Error saving file path" });
      }
      console.log("File path saved to filename.txt:", filePath);
      res.json({ success: true, message: "File uploaded successfully", filePath });
    });
  } else {
    res.status(400).json({ success: false, message: "No file uploaded" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
