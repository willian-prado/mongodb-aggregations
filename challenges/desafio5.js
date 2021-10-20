const favActors = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney",
];

db.movies.aggregate([
  { $match: {
    $and: [
      { countries: "USA" },
      { "tomatoes.viewer.rating": { $gte: 3 } },
    ],
  } },
  { $addFields: {
    favorites: { $setIntersection: [favActors, "$cast"] },
  } },
  { $match: {
    favorites: { $ne: null },
  } },
  { $addFields: {
    num_favs: { $cond: { if: { $isArray: "$favorites" }, then: { $size: "$favorites" }, else: 0 } },
  } },
  { $project: {
    _id: 0,
    title: 1,
    countries: 1,
    favorites: 1,
    "tomatoes.viewer.rating": 1,
    num_favs: 1,
  } },
  { $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 } },
  { $skip: 24 },
  { $limit: 1 },
  { $project: {
    _id: 0,
    title: 1,
  } },
]);
