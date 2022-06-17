import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const SignUpPage = () => {
  const [ newUser, setNewUser] = useState({
    email: '',
    password: '',
  })
  const { email, password} = newUser;
  const { user, signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = ({ target }:ChangeEvent<HTMLInputElement>) => {
    setNewUser({
      ...newUser,
      [target.name]: target.value
    })
  }

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      await signUp(email, password)
      navigate('/')
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <>
      <div className="w-full h-screen">
        <img 
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/970e664f-2df4-47ce-b4fa-446082f5abc1/58026873-6d6d-4fef-a076-a390363ee759/DO-es-20220523-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
          alt="/" 
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white"> 
              <div className="max-w-[320px] mx-auto py-16">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <form 
                  onSubmit={ handleSubmit } 
                  className="w-full flex flex-col py-4"
                >
                  <input 
                    value={email}
                    name="email"
                    onChange={ handleChange }
                    className="p-3 my-2 bg-gray-700 rounded" 
                    type="emaill" 
                    placeholder="Email"
                  />
                  <input 
                    value={password}
                    name="password"
                    onChange={ handleChange }
                    className="p-3 my-2 bg-gray-700 rounded" 
                    type="password" 
                    placeholder="Password"
                  />
                  <button className="bg-red-600 py-3 my-6 rounded font-bold">Sign Up</button>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <p><input type="button" value="" className="mr-2" />Remember me</p>
                    <p>Nedd Help?</p>
                  </div>
                  <p className="py-8">
                    <span className="text-gray-500">
                      Already subscribed to Netflix? 
                    </span>{' '}
                    <Link to="/login">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
        </div>
        
      </div>
    </>
  )
}

export default SignUpPage