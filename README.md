# 🔖 Todo With Angular and Appwire v1.2.0



A simple todo app built with Appwrite and Angular

This repo was forked from [appwrite/demo-todo-with-angular](https://github.com/appwrite/demo-todo-with-angular)  and adapter with the new version of Appwire `1.2.0` and Web Sdk `v10.2.0`

## 🎬 Getting Started

### 🤘 Install Appwrite 
Follow Appwrite simple [Installation Guide](https://appwrite.io/docs/installation) to get Appwrite up and running in no time. You can either deploy Appwrite on your local machine or, on any cloud provider of your choice. 

To run Appwrite locally, run the following command (this App using this version of Appwire 1.2.0)
```
 docker run -it --rm \
    --volume /var/run/docker.sock:/var/run/docker.sock \
    --volume "$(pwd)"/appwrite:/usr/src/code/appwrite:rw \
    --entrypoint="install" \
    appwrite/appwrite:1.2.0
```

It is important to use the same version (`1.2.0`), because the Web SDK changed since then. otherwise you need to update the Appwrite Web Sdk

We need to make a few configuration changes to your Appwrite server. 

1. Install it locally , just follow the installation steps using `localhost` as the hostname and choose a port if you don't want to run it on port `80` i choose `9999`.

2. After the installation is done, access Appwrite on http://localhost:9999 or whatever port you chose.
3. need to signup ( this will be the admin user)
4. create a database, you can also customize the database ID.
5. create a collection, you can also customize the collection ID.
6. give permissions on the collection to `All users` [create,read,update,delete] 
![image](https://user-images.githubusercontent.com/39317129/210851577-c6774b72-674c-451c-9599-ad60d8be6ed9.png)


7. update the [environment](src/environments/environment.ts) with the projectID,databaseID,collectionID.

8. add Attributes to the collection ( content -> string -> 256 [required] , isComplete -> boolean [required] default: false )

![image](https://user-images.githubusercontent.com/39317129/210852072-3aa2d939-9e39-453b-ba90-6491d00daf91.png)


### **Run App locally**

Follow these instructions to run the demo app locally 💪🏼 

```sh
$ git clone git@github.com:mahjadan/todo-with-angular-appwire.git
$ cd todo-with-angular-appwire
$ npm install
$ npm start
```
