import Text "mo:base/Text";
import Error "mo:base/Error";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import List "mo:base/List" ;
import Int "mo:base/Int";
import Debug "mo:base/Debug";

actor {
  type Review = {
      review : Text ; 
      stars : Text ; 
      images :Text ; 
  } ; 

  stable var idCount = 0;
  stable var reviews : List.List<Review> = List.nil<Review>();

    public func addReview( reviewI : Text, starsI : Int, imagesI : Text) {
    idCount := idCount + 1;
    // let idstr = Text.fromInt(idCount);
    var reviewNew : Review ={

      // id1 = idI;
      id = Int.toText(idCount);
      review = reviewI;
      stars = Int.toText(starsI);
      images = imagesI;
    };
    reviews := List.push(reviewNew, reviews);
    // Debug.print(debug_show (reviews))
  };

  public query func getReview() : async [Review] {
       return List.toArray(reviews) ;
  }
};
