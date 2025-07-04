import {init, i, id, InstaQLEntity} from "@instantdb/core"
// import { environment } from "../../environment/enviroment";

// ID for app: test
const APP_ID = "82aa9ded-9163-4689-abdb-8016b7b05cca";

// Optional: Declare your schema!
const schema = i.schema({
  entities: {
    recipes: i.entity({
        id: i.string(),
      name: i.string(),
      image: i.string(),
      difficulty: i.string(),
      prepTimeMinutes:i.number(),
    }),
  },
});

const db = init({appId: APP_ID, schema});

// db.tx.recipes.listen((changes) => {
//   console.log("Modificări detectate în baza de date:", changes);
// });



export {db, schema};