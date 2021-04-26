import { ObjectId } from "bson";

class Record {
  /**
   *
   * @param {string} name The name of the record
   * @param {string status The status of the record. Default value is "Open"
   * @param {ObjectId} id The ObjectId to create this record with
   */
  constructor({
    name,
    partition,
    status = Record.STATUS_OPEN,
    id = new ObjectId(),
  }) {
    this._partition = partition;
    this._id = id;
    this.name = name;
    this.status = status;
  }

  static STATUS_OPEN = "Open";
  static STATUS_IN_PROGRESS = "InProgress";
  static STATUS_COMPLETE = "Complete";
  static schema = {
    name: "Record",
    properties: {
      _id: "objectId",
      _partition: "string?",
      name: "string",
      status: "string",
    },
    primaryKey: "_id",
  };
}

export { Record };
