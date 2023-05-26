migrate((db) => {
  const collection = new Collection({
    "id": "zl25u6tr8i8fhne",
    "created": "2023-05-26 04:56:20.883Z",
    "updated": "2023-05-26 04:56:20.883Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "vkbwiu9f",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("zl25u6tr8i8fhne");

  return dao.deleteCollection(collection);
})
