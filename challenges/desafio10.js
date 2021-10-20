db.trips.aggregate([
  { $addFields: {
    totalTrip: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      1000 * 60 * 60,
    ] },
  } },
  { $group: {
    _id: "$usertype",
    duracaoMedia: { $avg: "$totalTrip" },
  } },
  { $project: {
    _id: 0,
    tipo: "$_id",
    duracaoMedia: { $round: ["$duracaoMedia", 2] },
  } },
  { $sort: { duracaoMedia: 1 } },
]);
