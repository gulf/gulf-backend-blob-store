# Gulf backend: Blob store
This is a storage backend for [gulf](https://github.com/gulf/gulf) that stores data in a [Blob store](https://github.com/maxogden/abstract-blob-store).

Compatible with gulf v5, only.

## Usage
```
const BlobstoreAdapter = require('gulf-backend-blob-store')

new gulf.Document({
  ottype: yourOtType
, storageAdapter: new BlobstoreAdapter(YourBlobStoreHere)
})
```

## API

### class: BlobstoreAdapter(store:BlobStore, [docId:Number = 0])
Pass the blob store instance and optionally the id of the document, if you'd like to store multiple documents in the same store.

## Legal
(c) 2016 by Marcel Klehr

License: LGPL 3.0
