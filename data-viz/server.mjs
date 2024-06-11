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
const date = Date.now();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads/")); // Temporary storage
  },
  filename: (req, file, cb) => {
    cb(null, `${date}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (req.file) {
    const filePath = path.join(__dirname, "./client/public/filename.txt"); // Update the file path here

    // Write the file path to filename.txt
    fs.writeFile(filePath, req.file.path, (err) => {
      if (err) {
        console.error("Error writing to filename.txt:", err);
        return res.status(500).json({ success: false, message: "Error saving file path" });
      }
      console.log("File path saved to filename.txt:", req.file.path);
      // res.json({ success: true, message: "File uploaded successfully", filePath: req.file.path });
    });

    const temporaryFilePath = req.file.path; // Temporary path
    const targetDirectory = path.join(__dirname, "./client/public/");
    const targetFileName = `${date}-${req.file.originalname}`;
    const targetFilePath = path.join(targetDirectory, targetFileName);
    console.log(temporaryFilePath);
    console.log(targetFilePath);

    // Move file to target directory
    fs.rename(temporaryFilePath, targetFilePath, (err) => {
      if (err) {
        console.error("Error moving file:", err);
        return res.status(500).json({ success: false, message: "Error moving file" });
      }
      console.log("File moved successfully");
      res.json({ success: true, message: "File uploaded successfully", filePath: targetFilePath });
    });
  } else {
    res.status(400).json({ success: false, message: "No file uploaded" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



// import express from "express";
// import multer from "multer";
// import cors from "cors";
// import path from "path";
// import fs from "fs";
// import { fileURLToPath } from "url";
// import { dirname } from "path";
//
// const app = express();
// const port = 5000;
//
// app.use(cors());
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "uploads/"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
//
// const upload = multer({ storage });
//
// app.post("/upload", upload.single("file"), (req, res) => {
//   if (req.file) {
    // const filePath = path.join(__dirname, "./client/public/filename.txt"); // Update the file path here
    //
    // // Write the file path to filename.txt
    // fs.writeFile(filePath, req.file.path, (err) => {
    //   if (err) {
    //     console.error("Error writing to filename.txt:", err);
    //     return res.status(500).json({ success: false, message: "Error saving file path" });
    //   }
    //   console.log("File path saved to filename.txt:", req.file.path);
    //   res.json({ success: true, message: "File uploaded successfully", filePath: req.file.path });
    // });
//   } else {
//     res.status(400).json({ success: false, message: "No file uploaded" });
//   }
// });
//
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });
//
