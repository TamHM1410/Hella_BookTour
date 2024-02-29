import { app } from "./src/app";
import "dotenv/config";
import swaggerDocs from "./src/helpers/swagger/swagger";
const Port = process.env.PORT;
app.listen(Port, () => {
  console.log("App listen", Port);
  swaggerDocs(app, Port);
});
