



// eslint-disable-next-line no-undef
self.onmessage = function(data){
    let ad =0
    for(let i=0; i<50000000; i++){
        ad++
    }
    //console.log(data.data)
    // eslint-disable-next-line no-undef
    self.postMessage(data.data + '333'+ad)
}