import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
    <form action="/user/signin" method="POST">
    <div class="container m-4 align-self-center">

      <div class="form-outline m-4">

        <input type="text" id="username" name="username" class="form-control" />
        <label class="form-label" for="username">Username</label>
      </div>

      <div class="form-outline m-4">
        <input type="password" id="password" name="password" class="form-control" />
        <label class="form-label" for="password">Password</label>
      </div>


      <div class="text-center">
      <div class="row m-4">
        <div class="col d-flex justify-content-center">

          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="form2Example31" checked />
            <label class="form-check-label" for="form2Example31"> Remember me </label>
          </div>
        </div>

        <div class="col">

          <a href="#!">Forgot password?</a>
        </div>
      </div>


      
      <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>
      </div>


      <div class="text-center">
        <p>Not a member? <a href="/user/register">Register</a></p>
      </div>
      </div>
    </form>
    </div>

  );
}

export default App;
