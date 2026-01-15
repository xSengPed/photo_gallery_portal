export interface ImmichSharedLink {
  id: string;
  description: string | null;
  userId: string;
  key: string;
  type: string;
  createdAt: string;
  expiresAt: string | null;
  allowUpload: boolean;
  allowDownload: boolean;
  showMetadata: boolean;
  password: string | null;
  album?: {
    id: string;
    albumName: string;
    albumThumbnailAssetId: string | null;
    shared: boolean | null;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    ownerId?: string;
    assetCount?: number;
  };
  assets: ImmichAsset[];
}

export interface ImmichAsset {
  id: string;
  deviceAssetId: string;
  ownerId: string;
  deviceId: string;
  type: string;
  originalPath: string;
  originalFileName: string;
  resized: boolean;
  thumbhash: string | null;
  fileCreatedAt: string;
  fileModifiedAt: string;
  updatedAt: string;
  isFavorite: boolean;
  isArchived: boolean;
  isTrashed: boolean;
  duration: string;
  exifInfo?: {
    make: string | null;
    model: string | null;
    exifImageWidth: number | null;
    exifImageHeight: number | null;
    fileSizeInByte: number;
    orientation: string | null;
    dateTimeOriginal: string;
    modifyDate: string;
    timeZone: string | null;
    lensModel: string | null;
    fNumber: number | null;
    focalLength: number | null;
    iso: number | null;
    exposureTime: string | null;
    latitude: number | null;
    longitude: number | null;
    city: string | null;
    state: string | null;
    country: string | null;
    description: string | null;
  };
}

export interface ImmichSharedLinksResponse {
  sharedLinks: ImmichSharedLink[];
}
