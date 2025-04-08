export interface Department {
  departmentId: number;
  displayName: string;
}

export interface SearchResponse {
  total: number;
  objectIDs: number[];
}

export interface ArtObject {
  objectID: number;
  title: string;
  artistDisplayName?: string;
  artistDisplayBio?: string;
  objectDate?: string;
  medium?: string;
  primaryImage?: string;
  primaryImageSmall?: string;
  department?: string;
  culture?: string;
  period?: string;
  dimensions?: string;
  creditLine?: string;
  accessionNumber?: string;
  objectURL?: string;
}
