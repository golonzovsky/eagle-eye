# open tomcat manger web ui [![Build Status](https://travis-ci.org/golonzovsky/eagle-eye.svg?branch=master)](https://travis-ci.org/golonzovsky/eagle-eye)
tomcat manager ui for navigating and undeploying apps      
mostly just playground for fullstack project on spring-boot, angular4, bootstrap4, SSE, websockets, docker, travis

![help_animation_sorry_for_filesize.gif](help_animation_sorry_for_filesize.gif)

### todo 
- [x] undeploy action
- [x] icon
- [x] unactive list
- [x] 'remove item' animation
- [x] SSE update list on undeploy (https://hpbn.co/server-sent-events-sse/, https://www.youtube.com/watch?v=nxakp15CACY)
- [x] SSE reconnect
- [ ] websocket/SSE update list on new apps. polling tomcat for list? 
- [x] docker `docker run -p 127.0.0.1:80:8181 golonzovsky/eagle-eye`
- [x] travis build
- [ ] travis push docker image to hub
- [ ] set client api url to / on bundled .jar 
- [ ] compose setup with separate backend and frontend in different containers + CORS 