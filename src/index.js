/**
 * Create a blob store adapter
 * @param blobStore <BlobStore>
 * @param docId <Number> The id of the document, defaults to 0
 */
function BlobStoreAdapter(blobStore, docId) {
  this.blobStore = blobStore
  this.docId = docId || 0
}

ADAPTER = BlobStoreAdapter.prototype

ADAPTER.getLastRevisionId = function() {
  var buffer = new Buffer()
  return new Promise((resolve, reject) => {
    this.blobStore.createReadStream(this.docId)
    .on('data', (b) => {
      buffer = buffer.concat(b)
    })
    .on('end', () => {
      try {
        resolve(JSON.parse(buffer)) 
      }catch(e) {
        reject(e)
      }
    })
    .on('error', reject)
  })
}

ADAPTER._setLastRevId = function(id) {
  return new Promise((resolve, reject) => {
    var stream = self.blobStore.createWriteStream(this.docId, function(er) {
      if (er) return reject(er)
      resolve()
    })
    stream.end(JSON.stringify(id))
  })
}

ADAPTER.storeRevision = function(rev) {
  return Promise.resolve()
  .then((d) => {
    return new Promise((resolve, reject) => {
      var stream = self.blobStore.createWriteStream(this.docId+':'+rev.id)
      stream.end(JSON.stringify(rev))
    })
  })
  .then(function() { 
    return self._setLastRevId(rev.id)
  })
}

ADAPTER.getRevision = function(revId) {
  return Promise.resolve()
  .then((revId) => {
    var buffer = new Buffer()
    return new Promise((resolve, reject) => {
      self.blobStore.createReadStream(this.docId+':'+revId)
      .on('data', (b) => {
        buffer = buffer.concat(b)
      })
      .on('end', () => {
        try {
          resolve(JSON.parse(buffer)) 
        }catch(e) {
          reject(e)
        }
      })
      .on('error', reject)
    })
  })
}
