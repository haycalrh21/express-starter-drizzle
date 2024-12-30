import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { RequestHandler } from "express";

// Cloudinary Configuration
cloudinary.config({
  cloud_name: "dn7elxsw6",
  api_key: "765376974365957",
  api_secret: "2WoTsfxjwx7pqCB8C7d2agTwcEs",
});

// Fungsi upload image yang sesuai dengan middleware Express
export const uploadImage: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { file } = req.body;

    if (!file) {
      // Tidak perlu return, langsung kirim response
      res.status(400).json({ error: "File is required" });
      return;
    }

    if (typeof file === "string" && file.startsWith("data:image")) {
      const uploadResponse = await cloudinary.uploader.upload(file, {
        folder: "rent-apart",
      });
      res.json({ url: uploadResponse.secure_url });
      return;
    }

    res.status(400).json({ error: "Invalid file format" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to process request" });
  }
};
