/* 
* ----------------------------------------------------------------------------------
* --------------------------------- $group -----------------------------------------
* ----------------------------------------------------------------------------------
*/
//group and single document of group
await Appointment.aggregate([
      { $sort: { createdAt: -1 } }, //reverse
      { $skip: skip }, //for pagination
      { $limit: limit }, //for pagination
      {
        $group: {
          _id: { select_date: "$select_date" }, //group by select_date
          doc: { "$first": "$$ROOT" } // with all properties (single document)
        }
      },
      {
        $replaceRoot: { newRoot: "$doc" }
      }
    ])


//group and all items by group
    return await Appointment.aggregate([
      { $sort: { createdAt: -1 } }, //reverse
      { $skip: skip }, //for pagination
      { $limit: limit }, //for pagination
      {
        $group: {
          _id: { select_date: "$select_date" }, //group by select_date
          docs: { "$push": "$$ROOT" }, // push all group item with all properties
        }
      }
    ])
