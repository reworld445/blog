import axios from 'axios'

export default async (url='',data={},method="POST") => {
    // if (process.env.NODE_ENV === "production") {
    //     url = "http://106.12.172.79.8088/" + url
    // }
    return new Promise((resolve,reject)=>{
        axios({
            url,
            method,
            data:['GET','POST','DELETE'].indexOf(method.toUpperCase())>-1?data:{},
            params:"GET" === method.toUpperCase()?data:{}
        }).then(resObj => {
            resolve(resObj)
        }).catch(error=>{
            reject(error)
        })
    })
}
