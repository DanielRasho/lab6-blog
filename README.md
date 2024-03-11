<div align = "center">
  <img src="./brushWireLogo.png" width="300px"><h1 align="center"> 
    <h5 align="center"> <i style="color:grey;"> 
   A blog for inspired artists</i> </h5>
</div>

Made with [Node.js](https://nodejs.org/en) and [React](https://es.react.dev/) 

?  **Live API:** Doing..

Made with ? by Daniel Rayo

---

## Running the Project

### Backend ?

1. **Create the DB:** The backend requires a functional Docker Container with postgres, for that, run the following commands in shell.<u> This will need to be done only once.</u>
   
   ```bash
   cd ./backend
   docker build -t brushwire-blog -f ./Dockerfile .
   docker docker run --name brushwire -p 5433:5432 -d brushwire-blog:latest
   ```

2. **Run the container**: For the API to connect to the DB the container must be running, for that run:
   
   ```bash
   docker start brushwire
   ```

3. **Install dependencies:** Now install the dependencies
   
   ```bash
   npm install    # if using npm
   yarn install   # if using yarn
   ```

4. **Start API:** Finally start the API to start listening.
   
   ```bash
   npm start      # if using npm
   yarn start     # if using yarn
   ```

### Frontend ?

Working on it...BrushWire
