import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Announcement_Key {
  announcementId: UUIDString;
  __typename?: 'Announcement_Key';
}

export interface CollectionStatus_Key {
  collectionStatusId: UUIDString;
  __typename?: 'CollectionStatus_Key';
}

export interface CreateGarbageCategoryData {
  garbageCategory_insert: GarbageCategory_Key;
}

export interface CreateGarbageCategoryVariables {
  categoryName: string;
  description?: string | null;
}

export interface CreateGarbagePostData {
  garbagePost_insert: GarbagePost_Key;
}

export interface CreateGarbagePostVariables {
  userId: UUIDString;
  photoUrl?: string | null;
  latitude: number;
  longitude: number;
  comment?: string | null;
  garbageSize?: string | null;
  hazardous?: boolean | null;
  aiResult?: string | null;
  collectionStatus?: string | null;
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface CreateUserVariables {
  lineUserId?: string | null;
  displayName?: string | null;
  userType?: string | null;
}

export interface GarbageCategory_Key {
  categoryId: UUIDString;
  __typename?: 'GarbageCategory_Key';
}

export interface GarbagePlace_Key {
  garbagePlaceId: UUIDString;
  __typename?: 'GarbagePlace_Key';
}

export interface GarbagePost_Key {
  postId: UUIDString;
  __typename?: 'GarbagePost_Key';
}

export interface GpsActivityRecord_Key {
  activityRecordId: UUIDString;
  __typename?: 'GpsActivityRecord_Key';
}

export interface ListAnnouncementsData {
  announcements: ({
    announcementId: UUIDString;
    creator: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    title?: string | null;
    body?: string | null;
    announcementType?: string | null;
    publishedAt?: TimestampString | null;
    publishedUntil?: TimestampString | null;
  } & Announcement_Key)[];
}

export interface ListCollectionStatusesData {
  collectionStatuses: ({
    collectionStatusId: UUIDString;
    post: {
      postId: UUIDString;
    } & GarbagePost_Key;
    collector: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    collectedAt?: TimestampString | null;
    collectionStatus?: string | null;
    garbagePlace?: {
      garbagePlaceId: UUIDString;
      placeName?: string | null;
    } & GarbagePlace_Key;
    note?: string | null;
  } & CollectionStatus_Key)[];
}

export interface ListGarbageCategoriesData {
  garbageCategories: ({
    categoryId: UUIDString;
    categoryName: string;
    description?: string | null;
  } & GarbageCategory_Key)[];
}

export interface ListGarbagePlacesData {
  garbagePlaces: ({
    garbagePlaceId: UUIDString;
    placeName?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
  } & GarbagePlace_Key)[];
}

export interface ListGarbagePostsData {
  garbagePosts: ({
    postId: UUIDString;
    user: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    photoUrl?: string | null;
    latitude: number;
    longitude: number;
    comment?: string | null;
    postedAt: TimestampString;
    garbageSize?: string | null;
    hazardous?: boolean | null;
    aiResult?: string | null;
    collectionStatus?: string | null;
    collectedAt?: TimestampString | null;
  } & GarbagePost_Key)[];
}

export interface ListGpsActivityRecordsData {
  gpsActivityRecords: ({
    activityRecordId: UUIDString;
    user: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    latitude: number;
    longitude: number;
    recordedAt: TimestampString;
  } & GpsActivityRecord_Key)[];
}

export interface ListNotificationsData {
  notifications: ({
    notificationId: UUIDString;
    user: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    post?: {
      postId: UUIDString;
    } & GarbagePost_Key;
    notificationContent?: string | null;
    notifiedAt: TimestampString;
  } & Notification_Key)[];
}

export interface ListUsersData {
  users: ({
    userId: UUIDString;
    lineUserId?: string | null;
    displayName?: string | null;
    userType?: string | null;
    registeredAt?: TimestampString | null;
  } & User_Key)[];
}

export interface ListVolunteerRequestsData {
  volunteerRequests: ({
    requestId: UUIDString;
    requester: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    targetUser: {
      userId: UUIDString;
      displayName?: string | null;
    } & User_Key;
    requestContent?: string | null;
    requestedAt: TimestampString;
    status?: string | null;
  } & VolunteerRequest_Key)[];
}

export interface Notification_Key {
  notificationId: UUIDString;
  __typename?: 'Notification_Key';
}

export interface User_Key {
  userId: UUIDString;
  __typename?: 'User_Key';
}

export interface VolunteerRequest_Key {
  requestId: UUIDString;
  __typename?: 'VolunteerRequest_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;
export function createUser(dc: DataConnect, vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateGarbageCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGarbageCategoryVariables): MutationRef<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGarbageCategoryVariables): MutationRef<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;
  operationName: string;
}
export const createGarbageCategoryRef: CreateGarbageCategoryRef;

export function createGarbageCategory(vars: CreateGarbageCategoryVariables): MutationPromise<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;
export function createGarbageCategory(dc: DataConnect, vars: CreateGarbageCategoryVariables): MutationPromise<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;

interface CreateGarbagePostRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGarbagePostVariables): MutationRef<CreateGarbagePostData, CreateGarbagePostVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateGarbagePostVariables): MutationRef<CreateGarbagePostData, CreateGarbagePostVariables>;
  operationName: string;
}
export const createGarbagePostRef: CreateGarbagePostRef;

export function createGarbagePost(vars: CreateGarbagePostVariables): MutationPromise<CreateGarbagePostData, CreateGarbagePostVariables>;
export function createGarbagePost(dc: DataConnect, vars: CreateGarbagePostVariables): MutationPromise<CreateGarbagePostData, CreateGarbagePostVariables>;

interface ListUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
  operationName: string;
}
export const listUsersRef: ListUsersRef;

export function listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;
export function listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListGarbageCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGarbageCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGarbageCategoriesData, undefined>;
  operationName: string;
}
export const listGarbageCategoriesRef: ListGarbageCategoriesRef;

export function listGarbageCategories(options?: ExecuteQueryOptions): QueryPromise<ListGarbageCategoriesData, undefined>;
export function listGarbageCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGarbageCategoriesData, undefined>;

interface ListGarbagePostsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGarbagePostsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGarbagePostsData, undefined>;
  operationName: string;
}
export const listGarbagePostsRef: ListGarbagePostsRef;

export function listGarbagePosts(options?: ExecuteQueryOptions): QueryPromise<ListGarbagePostsData, undefined>;
export function listGarbagePosts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGarbagePostsData, undefined>;

interface ListGarbagePlacesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGarbagePlacesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGarbagePlacesData, undefined>;
  operationName: string;
}
export const listGarbagePlacesRef: ListGarbagePlacesRef;

export function listGarbagePlaces(options?: ExecuteQueryOptions): QueryPromise<ListGarbagePlacesData, undefined>;
export function listGarbagePlaces(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGarbagePlacesData, undefined>;

interface ListCollectionStatusesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCollectionStatusesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCollectionStatusesData, undefined>;
  operationName: string;
}
export const listCollectionStatusesRef: ListCollectionStatusesRef;

export function listCollectionStatuses(options?: ExecuteQueryOptions): QueryPromise<ListCollectionStatusesData, undefined>;
export function listCollectionStatuses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCollectionStatusesData, undefined>;

interface ListGpsActivityRecordsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGpsActivityRecordsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListGpsActivityRecordsData, undefined>;
  operationName: string;
}
export const listGpsActivityRecordsRef: ListGpsActivityRecordsRef;

export function listGpsActivityRecords(options?: ExecuteQueryOptions): QueryPromise<ListGpsActivityRecordsData, undefined>;
export function listGpsActivityRecords(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGpsActivityRecordsData, undefined>;

interface ListAnnouncementsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAnnouncementsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAnnouncementsData, undefined>;
  operationName: string;
}
export const listAnnouncementsRef: ListAnnouncementsRef;

export function listAnnouncements(options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;
export function listAnnouncements(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;

interface ListNotificationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNotificationsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListNotificationsData, undefined>;
  operationName: string;
}
export const listNotificationsRef: ListNotificationsRef;

export function listNotifications(options?: ExecuteQueryOptions): QueryPromise<ListNotificationsData, undefined>;
export function listNotifications(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListNotificationsData, undefined>;

interface ListVolunteerRequestsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVolunteerRequestsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListVolunteerRequestsData, undefined>;
  operationName: string;
}
export const listVolunteerRequestsRef: ListVolunteerRequestsRef;

export function listVolunteerRequests(options?: ExecuteQueryOptions): QueryPromise<ListVolunteerRequestsData, undefined>;
export function listVolunteerRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVolunteerRequestsData, undefined>;

