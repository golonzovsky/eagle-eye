# open tomcat manger web ui [![Build Status](https://travis-ci.org/golonzovsky/eagle-eye.svg?branch=master)](https://travis-ci.org/golonzovsky/eagle-eye)
tomcat manager ui for navigating and undeploying apps      
mostly just playground for fullstack project on angular4, bootstrap4, spring-boot, docker, travis

### todo 
- [x] undeploy action
- [x] icon
- [x] unactive list
- [x] 'remove item' animation
- [x] SSE update list un undeploy 
- [ ] SSE keepalives/reconnect
- [ ] websocket/SSE update list on new apps. polling tomcat for list? 
- [x] docker `docker run -p 127.0.0.1:80:8181 golonzovsky/eagle-eye`
- [ ] make docker to see host tomcat (does it even make sense?)
- [x] travis build
- [ ] travis push docker image to hub
- [ ] compose setup with separate backend and frontend in different containers + CORS 