db.trips.aggregate([
  { $addFields: {
    totalTrip: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      1000 * 60,
    ] },
  } },
  { $group: {
    _id: "$bikeid",
    averageTime: { $avg: "$totalTrip" },
  } },
  { $project: {
    _id: 0,
    bikeId: "$_id",
    duracaoMedia: { $ceil: ["$averageTime"] },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
]);
