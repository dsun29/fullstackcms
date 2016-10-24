# fullstackcms
FullstackCMS is a content management system (CMS) /blogger system that is made of NodeJS, Express, MongoDB, React, Redux and Twitter Bootstrap. This project is under development.

# How to install
### Prerequisites
  - NodeJS 6.5+
  - NPM 3.10+
  - webpack 1.x
  - A MongoDB instance
  
### Create Text Index in MongoDB
```javascript
db.Posts.createIndex({title: "text", tags: "text", content: "text"});
```

### Get FullstackCMS source code
```sh
 git clone https://github.com/dsun29/fullstackcms.git your-own-folder
```

### Install NPM packages
```sh
 npm install
```

### Modify /share/global_config.jsx
 update the service_root_url in global_config