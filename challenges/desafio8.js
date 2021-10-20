db.air_alliances.aggregate([
  { $unwind: "$airlines" },
  { $lookup: {
    from: "air_routes",
    let: { alliance: "$name", airline: "$airlines" },
    pipeline: [
      { $match: {
        $expr: { $eq: ["$$airline", "$airline.name"] },
      } },
      { $project: {
        _id: 0,
        model: "$airplane",
      } },
    ],
    as: "airplane",
  } },
  { $unwind: "$airplane" },
  { $match: {
    "airplane.model": { $in: ["747", "380"] },
  } },
  { $group: {
    _id: "$name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
