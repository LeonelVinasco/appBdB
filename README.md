# Employees Management Web App

This is a web app for managing employees data, mainly to know the hierarchy on the companies.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The software used to develop the application is listed below, but really you just need docker, docker compose ang Git.

```
NodeJS 12.16.3
Docker 19.03.12
Docker-compose 1.26.2
PostgreSQL 12.4.1
Git 2.28.0
```

You can click on the next links to install the software we need for running this web app. You can find a set of instructions that tell you how to install Git, Docker and Docker Compose for your OS and distribution.

* [install Docker Engine](https://docs.docker.com/engine/install/) - container technology

* [install Docker Compose](https://docs.docker.com/compose/install/) - Tool for defining and running multi-container Docker applications.

* [install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) - Version control system.

### Installing

Now lets continue with the steps to install the Employees Management Web App. 


1) Clone the repo. Type on the terminal:

```
$ git clone https://github.com/LeonelVinasco/appBdB
```

Go to the main folder

```
$ cd appBdB
```

Build:

```
$ sudo docker-compose --build

Now the 4 containers are builded. client, api, postgres and test.

End with an example of getting some data out of the system or using it for a little demo

### Test Locally

At the moment the project has been builded. 

Run:

```
$ sudo docker-compose up

Open your browser and go to the following url

```
http://localhost:4000

Now you'll see the web interface that appears in the next image:

![diagram](readmeImage1.jpg)
![diagram](readmeImage2.jpg)
![diagram](readmeImage3.jpg)


## Running the tests

The test container runs the unit test automatically when you run the docker-compose command. If you want to add tests, add them to the file server/tests/employee.test.js or add a new file *.test.js that the program will automatically run it.


### Break down into end to end tests

The test includes on the project, test the api functionality. Especifically their 3 functions. Add a new employee, set a employee boss, and list all the employees.





## Built With

* [NodeJS](https://nodejs.org/es/docs/) - Javascript server side development environment 
* [Semantic UI](https://semantic-ui.com/) - Front-end development framework
* [Express](https://expressjs.com/) - Web application framework for Node. js


## Authors

* **Leonel Vinasco** - *Initial work* - [GITHUB](https://github.com/leonelvinasco)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
