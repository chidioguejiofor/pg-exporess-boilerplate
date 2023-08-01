import { createLogger } from "shared/utils";
import app from "./infrastructure/app";

const logger = createLogger("App");
const PORT = process.env.PORT || 3232;

app.listen(PORT, () => logger.info("Running on port " + PORT));
