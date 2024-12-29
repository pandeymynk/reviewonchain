export const idlFactory = ({ IDL }) => {
  const Review = IDL.Record({
    'review' : IDL.Text,
    'stars' : IDL.Text,
    'images' : IDL.Text,
  });
  return IDL.Service({
    'addReview' : IDL.Func([IDL.Text, IDL.Int, IDL.Text], [], ['oneway']),
    'getReview' : IDL.Func([], [IDL.Vec(Review)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
