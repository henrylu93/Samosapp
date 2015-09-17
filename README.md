# Samosapp

Last updated Sept 17, 2015. 

**Contents**

1. Introduction
2. Background
3. Development
4. Release

**Introduction**

Samosapp is a platform that allows student groups and clubs on campus to broadcast details of their food sales or fundraising events to users. The idea is that a student looking for an afternoon snack can  quickly determine if there are products like samosas being sold nearby. The app broadcasts details such as time, date, location, and type of product being advertised.

**Background**

This app was originally implemented in a final project for ECSE-428 at McGill University by a team consisting of Michael Curtis, Sid Gandhi, Matthew Gray, Henry Lu, Charles Marokhovsky, Nicolas Martin, Cole MacDonald, and Kelly Morrison. The version of this app that you see here, however, is a complete standalone project under development by Henry. While many of the features are the same between the two versions, none of the code from the school project was reused in the creation of this one. 

**Development**

This project was developed using JavaScript, HTML, CSS, PHP, and SQL. A tool called Apache Cordova was used to allow deployment on mobile platforms despite the app being written in JavaScript. Some frameworks and libraries used are AngularJS as an MVC framework, and Ionic Framework which provides UI elements and functionality speficially for Cordova apps. The event details are stored in a MySQL database on a remote shared server. The app uses HTTP POST requests to access PHP scripts stored on that server; these PHP scripts handle all the adding, modifying, and deleting of events through SQL. 

**Release**

At the moment Samosapp is not intended to be released to the public, mainly because I don't have the marketing skills and resources to convince students to download and use the app. This project was mainly for my own interests and gave me an opportunity to gain experience with Angular JS as well as some backend coding. 
