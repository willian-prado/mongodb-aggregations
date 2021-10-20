db.trips.aggregate([
  { $project: {
    diaDaSemana: { $dayOfWeek: "$startTime" },
  } },
  { $group: {
    _id: "$diaDaSemana",
    total: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    diaDaSemana: "$_id",
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
  { $lookup: {
    from: "trips",
    let: { diaDaSemana: "$diaDaSemana" },
    pipeline: [
      { $match: {
        $expr: { $eq: ["$$diaDaSemana", { $dayOfWeek: "$startTime" }] },
      } },
      { $project: {
        _id: 0,
        name: "$startStationName",
      } },
    ],
    as: "startStation",
  } },
  { $unwind: "$startStation" },
  { $group: {
    _id: "$startStation.name",
    total: { $sum: 1 },
  } },
  { $project: {
    _id: 0,
    nomeEstacao: "$_id",
    total: "$total",
  } },
  { $sort: { total: -1 } },
  { $limit: 1 },
]);
