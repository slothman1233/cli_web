



// eslint-disable-next-line no-undef
self.onmessage = function(data){
    console.log(data.data)
    // eslint-disable-next-line no-undef
    self.postMessage(data.data + '333')
}