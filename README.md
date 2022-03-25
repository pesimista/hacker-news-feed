# Reign required entry test

The required test completed with all the indications. I'm saving it on Github for future reference

It's been built so you'd only have to run docker-compose build and then run for it to work

## Challenge

They wanted me to build a small web application to test

my knowledge of Angular and related technologies.
They send a wireframe attached to an email for me to refer to for an understanding of what the finished app should look like.

The app had to have two separate components: the Server and the Client:
- The server has to take care of pulling the data into the
database and expose an API for the Angular client. 
- The client should render a web page that lists the articles in chronological order.

## Server Component

Once an hour, the server app should connect to this API which shows recently posted articles about Nodejs on Hacker News:

https://hn.algolia.com/api/v1/search_by_date?query=nodejs

The server app should insert the data from the API into a MongoDB database and also define a REST API which the client will use to retrieve the data.

## Client Component

The user should be able to view a web page which shows the most recent posts in date order (newer first). They should be able to click the delete button to delete an individual post from this view. Once a post is deleted it should not reappear, even if the HN API returns it. 

Also, keep an eye on how the date is presented on each row in the wireframes

## Stack

The options were as follow:

- Server component: 
  - Active LTS version of Node.js + NestJS + MongoDB

- Client component: 
  - latest version of Angular
  - latest version React

## Considerations

- Node.js version active LTS
- The server component should be coded in TypeScript
- The client component **should not** use any UI framework library like Bootstrap, Material UI, etc.
- At least 30% test coverage (statements) for the server component.
- The whole project has to be uploaded to GitLab
- Both artifacts (server and client) must be Dockerized
- To start the project there should be a docker-compose that uses both images and the MongoDB image.

## Extra-Considerations

- Tests and linters should run on a GitLab pipeline (gitlab-ci.yml).
- The client should be compiled in a Docker multi-stage build.

**Other than that, you are free to use any suitable npm or other libraries.** (i didn't use any)