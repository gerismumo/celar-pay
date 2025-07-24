import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

import app from "./app";

const HOST_NAME = process.env.HOST_NAME || "localhost";
const PORT = parseInt(process.env.PORT || "3000", 10);

app.listen(PORT, () => {
  console.log(`Server is running on on port ${PORT}`);
});
