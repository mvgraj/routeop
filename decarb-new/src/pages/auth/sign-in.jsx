


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    // Hardcoded credentials for demo purposes
  if (email === 'school@gmail.com' && password === '123') {
  localStorage.setItem('userType', 'school');
  navigate('/school-dashboard/fleet');
} else if (email === 'user@gmail.com' && password === '123') {
  localStorage.setItem('userType', 'user');
  navigate('/user-dashboard/home');
}

  };

  return (
    <section className="m-8 flex gap-4">
    <div className="absolute top-0 left-0 w-full h-16 z-50 flex items-center justify-between px-4">
      <a href='https://www.mbstech.ai/' target='_blank' className="flex items-center">
      <img
        src="https://mbs-data-bucket.s3.ap-south-1.amazonaws.com/website/images/Mbs_main/mbstech.ai.png"
        alt="Top Left"
        className="absolute top-0 left-0 p-6 w-[13%] h-auto z-50"
      />
      </a>
    </div>
      <div className="w-full lg:w-3/5 mt-24">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Sign In</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">
            Enter your email and password to Sign In.
          </Typography>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{ className: "before:content-none after:content-none" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <Checkbox
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className='flex justify-between'
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to the&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button type="submit" className="mt-6" fullWidth>
            Sign In
          </Button>

          {error && (
            <Typography variant="small" color="red" className="mt-4 text-center">
              {error}
            </Typography>
          )}

        </form>
      </div>
      <div className="w-2/5 h-[95vh] hidden lg:block">
        <iframe
          src="all_bus_routes.html" 
          title="HTML Preview"
          className="h-full w-full rounded-3xl border border-gray-200"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </section>
  );
}

export default SignIn;
