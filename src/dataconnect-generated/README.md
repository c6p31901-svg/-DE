# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListUsers*](#listusers)
  - [*ListGarbageCategories*](#listgarbagecategories)
  - [*ListGarbagePosts*](#listgarbageposts)
  - [*ListGarbagePlaces*](#listgarbageplaces)
  - [*ListCollectionStatuses*](#listcollectionstatuses)
  - [*ListGpsActivityRecords*](#listgpsactivityrecords)
  - [*ListAnnouncements*](#listannouncements)
  - [*ListNotifications*](#listnotifications)
  - [*ListVolunteerRequests*](#listvolunteerrequests)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*CreateGarbageCategory*](#creategarbagecategory)
  - [*CreateGarbagePost*](#creategarbagepost)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListUsers
You can execute the `ListUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listUsers(options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listUsers(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListUsersData, undefined>;

interface ListUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListUsersData, undefined>;
}
export const listUsersRef: ListUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listUsersRef:
```typescript
const name = listUsersRef.operationName;
console.log(name);
```

### Variables
The `ListUsers` query has no variables.
### Return Type
Recall that executing the `ListUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListUsersData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListUsersData {
  users: ({
    userId: UUIDString;
    lineUserId?: string | null;
    displayName?: string | null;
    userType?: string | null;
    registeredAt?: TimestampString | null;
  } & User_Key)[];
}
```
### Using `ListUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listUsers } from '@dataconnect/generated';


// Call the `listUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listUsersRef } from '@dataconnect/generated';


// Call the `listUsersRef()` function to get a reference to the query.
const ref = listUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## ListGarbageCategories
You can execute the `ListGarbageCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGarbageCategories(options?: ExecuteQueryOptions): QueryPromise<ListGarbageCategoriesData, undefined>;

interface ListGarbageCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGarbageCategoriesData, undefined>;
}
export const listGarbageCategoriesRef: ListGarbageCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGarbageCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGarbageCategoriesData, undefined>;

interface ListGarbageCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListGarbageCategoriesData, undefined>;
}
export const listGarbageCategoriesRef: ListGarbageCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGarbageCategoriesRef:
```typescript
const name = listGarbageCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListGarbageCategories` query has no variables.
### Return Type
Recall that executing the `ListGarbageCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGarbageCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGarbageCategoriesData {
  garbageCategories: ({
    categoryId: UUIDString;
    categoryName: string;
    description?: string | null;
  } & GarbageCategory_Key)[];
}
```
### Using `ListGarbageCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGarbageCategories } from '@dataconnect/generated';


// Call the `listGarbageCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGarbageCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGarbageCategories(dataConnect);

console.log(data.garbageCategories);

// Or, you can use the `Promise` API.
listGarbageCategories().then((response) => {
  const data = response.data;
  console.log(data.garbageCategories);
});
```

### Using `ListGarbageCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGarbageCategoriesRef } from '@dataconnect/generated';


// Call the `listGarbageCategoriesRef()` function to get a reference to the query.
const ref = listGarbageCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGarbageCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.garbageCategories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.garbageCategories);
});
```

## ListGarbagePosts
You can execute the `ListGarbagePosts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGarbagePosts(options?: ExecuteQueryOptions): QueryPromise<ListGarbagePostsData, undefined>;

interface ListGarbagePostsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGarbagePostsData, undefined>;
}
export const listGarbagePostsRef: ListGarbagePostsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGarbagePosts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGarbagePostsData, undefined>;

interface ListGarbagePostsRef {
  ...
  (dc: DataConnect): QueryRef<ListGarbagePostsData, undefined>;
}
export const listGarbagePostsRef: ListGarbagePostsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGarbagePostsRef:
```typescript
const name = listGarbagePostsRef.operationName;
console.log(name);
```

### Variables
The `ListGarbagePosts` query has no variables.
### Return Type
Recall that executing the `ListGarbagePosts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGarbagePostsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListGarbagePosts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGarbagePosts } from '@dataconnect/generated';


// Call the `listGarbagePosts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGarbagePosts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGarbagePosts(dataConnect);

console.log(data.garbagePosts);

// Or, you can use the `Promise` API.
listGarbagePosts().then((response) => {
  const data = response.data;
  console.log(data.garbagePosts);
});
```

### Using `ListGarbagePosts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGarbagePostsRef } from '@dataconnect/generated';


// Call the `listGarbagePostsRef()` function to get a reference to the query.
const ref = listGarbagePostsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGarbagePostsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.garbagePosts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.garbagePosts);
});
```

## ListGarbagePlaces
You can execute the `ListGarbagePlaces` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGarbagePlaces(options?: ExecuteQueryOptions): QueryPromise<ListGarbagePlacesData, undefined>;

interface ListGarbagePlacesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGarbagePlacesData, undefined>;
}
export const listGarbagePlacesRef: ListGarbagePlacesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGarbagePlaces(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGarbagePlacesData, undefined>;

interface ListGarbagePlacesRef {
  ...
  (dc: DataConnect): QueryRef<ListGarbagePlacesData, undefined>;
}
export const listGarbagePlacesRef: ListGarbagePlacesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGarbagePlacesRef:
```typescript
const name = listGarbagePlacesRef.operationName;
console.log(name);
```

### Variables
The `ListGarbagePlaces` query has no variables.
### Return Type
Recall that executing the `ListGarbagePlaces` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGarbagePlacesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListGarbagePlacesData {
  garbagePlaces: ({
    garbagePlaceId: UUIDString;
    placeName?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    address?: string | null;
  } & GarbagePlace_Key)[];
}
```
### Using `ListGarbagePlaces`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGarbagePlaces } from '@dataconnect/generated';


// Call the `listGarbagePlaces()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGarbagePlaces();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGarbagePlaces(dataConnect);

console.log(data.garbagePlaces);

// Or, you can use the `Promise` API.
listGarbagePlaces().then((response) => {
  const data = response.data;
  console.log(data.garbagePlaces);
});
```

### Using `ListGarbagePlaces`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGarbagePlacesRef } from '@dataconnect/generated';


// Call the `listGarbagePlacesRef()` function to get a reference to the query.
const ref = listGarbagePlacesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGarbagePlacesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.garbagePlaces);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.garbagePlaces);
});
```

## ListCollectionStatuses
You can execute the `ListCollectionStatuses` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCollectionStatuses(options?: ExecuteQueryOptions): QueryPromise<ListCollectionStatusesData, undefined>;

interface ListCollectionStatusesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCollectionStatusesData, undefined>;
}
export const listCollectionStatusesRef: ListCollectionStatusesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCollectionStatuses(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCollectionStatusesData, undefined>;

interface ListCollectionStatusesRef {
  ...
  (dc: DataConnect): QueryRef<ListCollectionStatusesData, undefined>;
}
export const listCollectionStatusesRef: ListCollectionStatusesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCollectionStatusesRef:
```typescript
const name = listCollectionStatusesRef.operationName;
console.log(name);
```

### Variables
The `ListCollectionStatuses` query has no variables.
### Return Type
Recall that executing the `ListCollectionStatuses` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCollectionStatusesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListCollectionStatuses`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCollectionStatuses } from '@dataconnect/generated';


// Call the `listCollectionStatuses()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCollectionStatuses();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCollectionStatuses(dataConnect);

console.log(data.collectionStatuses);

// Or, you can use the `Promise` API.
listCollectionStatuses().then((response) => {
  const data = response.data;
  console.log(data.collectionStatuses);
});
```

### Using `ListCollectionStatuses`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCollectionStatusesRef } from '@dataconnect/generated';


// Call the `listCollectionStatusesRef()` function to get a reference to the query.
const ref = listCollectionStatusesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCollectionStatusesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.collectionStatuses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.collectionStatuses);
});
```

## ListGpsActivityRecords
You can execute the `ListGpsActivityRecords` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listGpsActivityRecords(options?: ExecuteQueryOptions): QueryPromise<ListGpsActivityRecordsData, undefined>;

interface ListGpsActivityRecordsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListGpsActivityRecordsData, undefined>;
}
export const listGpsActivityRecordsRef: ListGpsActivityRecordsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listGpsActivityRecords(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListGpsActivityRecordsData, undefined>;

interface ListGpsActivityRecordsRef {
  ...
  (dc: DataConnect): QueryRef<ListGpsActivityRecordsData, undefined>;
}
export const listGpsActivityRecordsRef: ListGpsActivityRecordsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listGpsActivityRecordsRef:
```typescript
const name = listGpsActivityRecordsRef.operationName;
console.log(name);
```

### Variables
The `ListGpsActivityRecords` query has no variables.
### Return Type
Recall that executing the `ListGpsActivityRecords` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListGpsActivityRecordsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListGpsActivityRecords`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listGpsActivityRecords } from '@dataconnect/generated';


// Call the `listGpsActivityRecords()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listGpsActivityRecords();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listGpsActivityRecords(dataConnect);

console.log(data.gpsActivityRecords);

// Or, you can use the `Promise` API.
listGpsActivityRecords().then((response) => {
  const data = response.data;
  console.log(data.gpsActivityRecords);
});
```

### Using `ListGpsActivityRecords`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listGpsActivityRecordsRef } from '@dataconnect/generated';


// Call the `listGpsActivityRecordsRef()` function to get a reference to the query.
const ref = listGpsActivityRecordsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listGpsActivityRecordsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.gpsActivityRecords);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.gpsActivityRecords);
});
```

## ListAnnouncements
You can execute the `ListAnnouncements` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAnnouncements(options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;

interface ListAnnouncementsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAnnouncementsData, undefined>;
}
export const listAnnouncementsRef: ListAnnouncementsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAnnouncements(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListAnnouncementsData, undefined>;

interface ListAnnouncementsRef {
  ...
  (dc: DataConnect): QueryRef<ListAnnouncementsData, undefined>;
}
export const listAnnouncementsRef: ListAnnouncementsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAnnouncementsRef:
```typescript
const name = listAnnouncementsRef.operationName;
console.log(name);
```

### Variables
The `ListAnnouncements` query has no variables.
### Return Type
Recall that executing the `ListAnnouncements` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAnnouncementsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAnnouncements`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAnnouncements } from '@dataconnect/generated';


// Call the `listAnnouncements()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAnnouncements();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAnnouncements(dataConnect);

console.log(data.announcements);

// Or, you can use the `Promise` API.
listAnnouncements().then((response) => {
  const data = response.data;
  console.log(data.announcements);
});
```

### Using `ListAnnouncements`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAnnouncementsRef } from '@dataconnect/generated';


// Call the `listAnnouncementsRef()` function to get a reference to the query.
const ref = listAnnouncementsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAnnouncementsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.announcements);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.announcements);
});
```

## ListNotifications
You can execute the `ListNotifications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listNotifications(options?: ExecuteQueryOptions): QueryPromise<ListNotificationsData, undefined>;

interface ListNotificationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListNotificationsData, undefined>;
}
export const listNotificationsRef: ListNotificationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listNotifications(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListNotificationsData, undefined>;

interface ListNotificationsRef {
  ...
  (dc: DataConnect): QueryRef<ListNotificationsData, undefined>;
}
export const listNotificationsRef: ListNotificationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listNotificationsRef:
```typescript
const name = listNotificationsRef.operationName;
console.log(name);
```

### Variables
The `ListNotifications` query has no variables.
### Return Type
Recall that executing the `ListNotifications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListNotificationsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListNotifications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listNotifications } from '@dataconnect/generated';


// Call the `listNotifications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listNotifications();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listNotifications(dataConnect);

console.log(data.notifications);

// Or, you can use the `Promise` API.
listNotifications().then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `ListNotifications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listNotificationsRef } from '@dataconnect/generated';


// Call the `listNotificationsRef()` function to get a reference to the query.
const ref = listNotificationsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listNotificationsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## ListVolunteerRequests
You can execute the `ListVolunteerRequests` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listVolunteerRequests(options?: ExecuteQueryOptions): QueryPromise<ListVolunteerRequestsData, undefined>;

interface ListVolunteerRequestsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListVolunteerRequestsData, undefined>;
}
export const listVolunteerRequestsRef: ListVolunteerRequestsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listVolunteerRequests(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListVolunteerRequestsData, undefined>;

interface ListVolunteerRequestsRef {
  ...
  (dc: DataConnect): QueryRef<ListVolunteerRequestsData, undefined>;
}
export const listVolunteerRequestsRef: ListVolunteerRequestsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listVolunteerRequestsRef:
```typescript
const name = listVolunteerRequestsRef.operationName;
console.log(name);
```

### Variables
The `ListVolunteerRequests` query has no variables.
### Return Type
Recall that executing the `ListVolunteerRequests` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListVolunteerRequestsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListVolunteerRequests`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listVolunteerRequests } from '@dataconnect/generated';


// Call the `listVolunteerRequests()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listVolunteerRequests();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listVolunteerRequests(dataConnect);

console.log(data.volunteerRequests);

// Or, you can use the `Promise` API.
listVolunteerRequests().then((response) => {
  const data = response.data;
  console.log(data.volunteerRequests);
});
```

### Using `ListVolunteerRequests`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listVolunteerRequestsRef } from '@dataconnect/generated';


// Call the `listVolunteerRequestsRef()` function to get a reference to the query.
const ref = listVolunteerRequestsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listVolunteerRequestsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.volunteerRequests);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.volunteerRequests);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createUser(vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect, vars?: CreateUserVariables): MutationPromise<CreateUserData, CreateUserVariables>;

interface CreateUserRef {
  ...
  (dc: DataConnect, vars?: CreateUserVariables): MutationRef<CreateUserData, CreateUserVariables>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has an optional argument of type `CreateUserVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateUserVariables {
  lineUserId?: string | null;
  displayName?: string | null;
  userType?: string | null;
}
```
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation has an optional argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  lineUserId: ..., // optional
  displayName: ..., // optional
  userType: ..., // optional
};

// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser(createUserVars);
// Variables can be defined inline as well.
const { data } = await createUser({ lineUserId: ..., displayName: ..., userType: ..., });
// Since all variables are optional for this mutation, you can omit the `CreateUserVariables` argument.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect, createUserVars);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser(createUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef, CreateUserVariables } from '@dataconnect/generated';

// The `CreateUser` mutation has an optional argument of type `CreateUserVariables`:
const createUserVars: CreateUserVariables = {
  lineUserId: ..., // optional
  displayName: ..., // optional
  userType: ..., // optional
};

// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef(createUserVars);
// Variables can be defined inline as well.
const ref = createUserRef({ lineUserId: ..., displayName: ..., userType: ..., });
// Since all variables are optional for this mutation, you can omit the `CreateUserVariables` argument.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect, createUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## CreateGarbageCategory
You can execute the `CreateGarbageCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGarbageCategory(vars: CreateGarbageCategoryVariables): MutationPromise<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;

interface CreateGarbageCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGarbageCategoryVariables): MutationRef<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;
}
export const createGarbageCategoryRef: CreateGarbageCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGarbageCategory(dc: DataConnect, vars: CreateGarbageCategoryVariables): MutationPromise<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;

interface CreateGarbageCategoryRef {
  ...
  (dc: DataConnect, vars: CreateGarbageCategoryVariables): MutationRef<CreateGarbageCategoryData, CreateGarbageCategoryVariables>;
}
export const createGarbageCategoryRef: CreateGarbageCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGarbageCategoryRef:
```typescript
const name = createGarbageCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateGarbageCategory` mutation requires an argument of type `CreateGarbageCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateGarbageCategoryVariables {
  categoryName: string;
  description?: string | null;
}
```
### Return Type
Recall that executing the `CreateGarbageCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGarbageCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGarbageCategoryData {
  garbageCategory_insert: GarbageCategory_Key;
}
```
### Using `CreateGarbageCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGarbageCategory, CreateGarbageCategoryVariables } from '@dataconnect/generated';

// The `CreateGarbageCategory` mutation requires an argument of type `CreateGarbageCategoryVariables`:
const createGarbageCategoryVars: CreateGarbageCategoryVariables = {
  categoryName: ..., 
  description: ..., // optional
};

// Call the `createGarbageCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGarbageCategory(createGarbageCategoryVars);
// Variables can be defined inline as well.
const { data } = await createGarbageCategory({ categoryName: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGarbageCategory(dataConnect, createGarbageCategoryVars);

console.log(data.garbageCategory_insert);

// Or, you can use the `Promise` API.
createGarbageCategory(createGarbageCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.garbageCategory_insert);
});
```

### Using `CreateGarbageCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGarbageCategoryRef, CreateGarbageCategoryVariables } from '@dataconnect/generated';

// The `CreateGarbageCategory` mutation requires an argument of type `CreateGarbageCategoryVariables`:
const createGarbageCategoryVars: CreateGarbageCategoryVariables = {
  categoryName: ..., 
  description: ..., // optional
};

// Call the `createGarbageCategoryRef()` function to get a reference to the mutation.
const ref = createGarbageCategoryRef(createGarbageCategoryVars);
// Variables can be defined inline as well.
const ref = createGarbageCategoryRef({ categoryName: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGarbageCategoryRef(dataConnect, createGarbageCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.garbageCategory_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.garbageCategory_insert);
});
```

## CreateGarbagePost
You can execute the `CreateGarbagePost` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createGarbagePost(vars: CreateGarbagePostVariables): MutationPromise<CreateGarbagePostData, CreateGarbagePostVariables>;

interface CreateGarbagePostRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateGarbagePostVariables): MutationRef<CreateGarbagePostData, CreateGarbagePostVariables>;
}
export const createGarbagePostRef: CreateGarbagePostRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createGarbagePost(dc: DataConnect, vars: CreateGarbagePostVariables): MutationPromise<CreateGarbagePostData, CreateGarbagePostVariables>;

interface CreateGarbagePostRef {
  ...
  (dc: DataConnect, vars: CreateGarbagePostVariables): MutationRef<CreateGarbagePostData, CreateGarbagePostVariables>;
}
export const createGarbagePostRef: CreateGarbagePostRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createGarbagePostRef:
```typescript
const name = createGarbagePostRef.operationName;
console.log(name);
```

### Variables
The `CreateGarbagePost` mutation requires an argument of type `CreateGarbagePostVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateGarbagePost` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateGarbagePostData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateGarbagePostData {
  garbagePost_insert: GarbagePost_Key;
}
```
### Using `CreateGarbagePost`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createGarbagePost, CreateGarbagePostVariables } from '@dataconnect/generated';

// The `CreateGarbagePost` mutation requires an argument of type `CreateGarbagePostVariables`:
const createGarbagePostVars: CreateGarbagePostVariables = {
  userId: ..., 
  photoUrl: ..., // optional
  latitude: ..., 
  longitude: ..., 
  comment: ..., // optional
  garbageSize: ..., // optional
  hazardous: ..., // optional
  aiResult: ..., // optional
  collectionStatus: ..., // optional
};

// Call the `createGarbagePost()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createGarbagePost(createGarbagePostVars);
// Variables can be defined inline as well.
const { data } = await createGarbagePost({ userId: ..., photoUrl: ..., latitude: ..., longitude: ..., comment: ..., garbageSize: ..., hazardous: ..., aiResult: ..., collectionStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createGarbagePost(dataConnect, createGarbagePostVars);

console.log(data.garbagePost_insert);

// Or, you can use the `Promise` API.
createGarbagePost(createGarbagePostVars).then((response) => {
  const data = response.data;
  console.log(data.garbagePost_insert);
});
```

### Using `CreateGarbagePost`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createGarbagePostRef, CreateGarbagePostVariables } from '@dataconnect/generated';

// The `CreateGarbagePost` mutation requires an argument of type `CreateGarbagePostVariables`:
const createGarbagePostVars: CreateGarbagePostVariables = {
  userId: ..., 
  photoUrl: ..., // optional
  latitude: ..., 
  longitude: ..., 
  comment: ..., // optional
  garbageSize: ..., // optional
  hazardous: ..., // optional
  aiResult: ..., // optional
  collectionStatus: ..., // optional
};

// Call the `createGarbagePostRef()` function to get a reference to the mutation.
const ref = createGarbagePostRef(createGarbagePostVars);
// Variables can be defined inline as well.
const ref = createGarbagePostRef({ userId: ..., photoUrl: ..., latitude: ..., longitude: ..., comment: ..., garbageSize: ..., hazardous: ..., aiResult: ..., collectionStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createGarbagePostRef(dataConnect, createGarbagePostVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.garbagePost_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.garbagePost_insert);
});
```

