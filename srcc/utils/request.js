import axios from 'axios'

export default async (url='',data={},method="POST") => {
    // if (process.env.NODE_ENV === "production") {
    //     url = "http://test.sq.zhongyidao.top/" + url
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
