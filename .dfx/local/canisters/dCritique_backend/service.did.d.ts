import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Review {
  'review' : string,
  'stars' : string,
  'images' : string,
}
export interface _SERVICE {
  'addReview' : ActorMethod<[string, bigint, string], undefined>,
  'getReview' : ActorMethod<[], Array<Review>>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
