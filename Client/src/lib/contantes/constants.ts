export const Predicate = {
  FOLLOWERS: "followers",
  FOLLOWINGS: "followings"
};

export type PredicateType = keyof typeof Predicate; 