export class SearchImagesParams {
  text?:string;
  tags?:string[];
  sort?:string;
  minUploadDate?:Date;
  maxUploadDate?:Date;
  minTakenDate?:Date;
  maxTakenDate?:Date;
  page?:number;
  userId?:string;
  nsfw?:number;
}
