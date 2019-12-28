# College App For its Activities and Notifications

Name: Abhishek Rai  

CollegeID: 160478   

Coventry ID:9638523

Batch: 19D


# Frontend code architecture

Provide a brief description of your front end code architecture including folder structure, API consumption, etc.

All the front end code in this project is carried out with HTML (HyperText Markup Language), CSS (Cascading Style Sheets), jQuery and JavaScript. All the html files are kept in separately from all the js and css files as js and css files are kept in their respective folder. Images required in front end code are kept in public folder. As there are two types of users in this application, there is separation between the files required for admins and users. Also, some html files do no belong to both the admins and users and these files are also kept separately. In this way the folder structure is managed in this project. It is first required to login to access the resources provided by the application. 





Coding architecture is simple in this project as no design methods/patterns (such as MVC) is implemented. However, the requests sent from frontend are processed in backend server using the API of that server. As this is only the front end code of an application so that we can also say it is a View part of MVC framework where Model and Controller are in the backend server. But we still can not say that MVC pattern is implemeted in this project.So there is no use of any design pattern but the folder strucutre is managed properly for easier maintability and understanding.

This is only the front end code of the web applications. For interacting with server, it consumes its own backend server build using Node js and MongoDB database. Most of the data in the applications are fetched from server through its API. All the interactions of either user or admins are possible only by the use of API. The API of this project is here in this link https://github.com/abysal/backendapi.git jQuery (AJAX) has been used to interact with server through API. So, in this way, the front end code interacts with backend server using the APIs' provided by the backend server.


