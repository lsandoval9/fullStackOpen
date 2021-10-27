
const myJson = `
{"message":"Request failed with status code 500","name":"Error","stack":"Error: Request failed with status code 500    at createError (http://localhost:3000/static/js/vendors~main.chunk.js:936:15)    at settle (http://localhost:3000/static/js/vendors~main.chunk.js:1170:12)    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/vendors~main.chunk.js:339:7)","config":{"url":"http://localhost:3001/api/persons","method":"post","data":"{\"name\":\"ag\",\"number\":\"123321122\"}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":-1,"maxBodyLength":-1,"transitional":{"silentJSONParsing":true,"forcedJSONParsing":true,"clarifyTimeoutError":false}}}
`

console.log(JSON.parse(myJson))