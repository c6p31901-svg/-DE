# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createUser, createGarbageCategory, createGarbagePost, listUsers, listGarbageCategories, listGarbagePosts, listGarbagePlaces, listCollectionStatuses, listGpsActivityRecords, listAnnouncements } from '@dataconnect/generated';


// Operation CreateUser:  For variables, look at type CreateUserVars in ../index.d.ts
const { data } = await CreateUser(dataConnect, createUserVars);

// Operation CreateGarbageCategory:  For variables, look at type CreateGarbageCategoryVars in ../index.d.ts
const { data } = await CreateGarbageCategory(dataConnect, createGarbageCategoryVars);

// Operation CreateGarbagePost:  For variables, look at type CreateGarbagePostVars in ../index.d.ts
const { data } = await CreateGarbagePost(dataConnect, createGarbagePostVars);

// Operation ListUsers: 
const { data } = await ListUsers(dataConnect);

// Operation ListGarbageCategories: 
const { data } = await ListGarbageCategories(dataConnect);

// Operation ListGarbagePosts: 
const { data } = await ListGarbagePosts(dataConnect);

// Operation ListGarbagePlaces: 
const { data } = await ListGarbagePlaces(dataConnect);

// Operation ListCollectionStatuses: 
const { data } = await ListCollectionStatuses(dataConnect);

// Operation ListGpsActivityRecords: 
const { data } = await ListGpsActivityRecords(dataConnect);

// Operation ListAnnouncements: 
const { data } = await ListAnnouncements(dataConnect);


```