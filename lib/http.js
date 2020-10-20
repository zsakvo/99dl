import axios from 'axios'

const mixin  = {
  baseUrl = "https://www.99csw.com",
  timeout:5000
}

function get(opts){
  return new Promise((resolve,reject)=>{
    axios.get(mixin.baseUrl+opts.url,{
      params:opts.params
    }).then(res=>{resolve(res.data)}).catch(err=>{reject(err)})
  })
}

const http={
  get
}

module.exports = http