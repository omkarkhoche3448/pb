const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");

const port = process.env.PORT || 3000;

const dbConnection = require("./config/db");
const projectRoutes = require("./routes/projectRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const experienceRoutes = require("./routes/experienceRoutes");

// Middleware
app.use(
  express.json({
    verify: (req, res, buf, encoding) => {
      try {
        if (buf.length > 0) {
          JSON.parse(buf.toString());
        }
      } catch (error) {
        console.error("Invalid JSON:", {
          rawBody: buf.toString(),
          errorMessage: error.message,
        });
        throw new Error("Invalid JSON payload");
      }
    },
    limit: "10mb",
  })
);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON in request body",
      details: {
        message: err.message,
        position: err.body
          ? `Near position ${
              err.body.startsWith("{") ? "0" : err.body.indexOf("{") + 1
            }`
          : "Unknown",
      },
    });
  }
  next(err);
});
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL || "http://localhost:3000", 
        "http://localhost:3000",  
        "https://omkarkhochek.vercel.app", 
      ];

     
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,  
    optionsSuccessStatus: 200, 
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
    abortOnLimit: true,
  })
);

// Use the routes
app.use("/api/projects", projectRoutes);
app.use("/api/achievement", achievementRoutes);
app.use("/api/experience", experienceRoutes);

dbConnection();
cloudinary.cloudinaryConnect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
