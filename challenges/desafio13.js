// Fonte: https://stackoverflow.com/questions/48112557/how-is-regex-filter-applied-to-date-isodate-type-field-in-mongodb

db.trips.aggregate([
  { $addFields: {
    totalTrip: { $divide: [
      { $subtract: ["$stopTime", "$startTime"] },
      1000 * 60,
    ] },
  } },
  { $project: {
    _id: 0,
    totalTrip: 1,
    day: { $dateToString: { format: "%d-%m-%Y", date: "$startTime" } },
  },
  },
  { $match: {
    day: "10-03-2016",
  },
  },
  { $group: {
    _id: "$day",
    averageTime: { $avg: "$totalTrip" },
  } },
  { $project: {
    _id: 0,
    duracaoMediaEmMinutos: { $round: ["$averageTime"] },
  } },
]);
