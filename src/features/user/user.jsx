import { useForm } from "react-hook-form";
import {CFLogo} from '../../assets'

const User = () => {
    const {register,handleSubmit,formState: { errors },} = useForm()
    return (
        <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-14 w-auto"
              src={CFLogo}
              alt="Company Logo"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Welcome Quiz App
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <form className="space-y-6" noValidate onSubmit={handleSubmit((formData) => {
                          console.log("formData", formData);
                          
              })}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      {...register('email',
                        {
                          required: 'email is required',
                          pattern: {
                            value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                            message: "email is not valid"
                          }
                        })}
                      type="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                                    
                  </div>
                </div>

  

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Start Quiz
                  </button>
                </div>
                <p className="text-red-500 text-center">{errors?.email?.message}</p>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
  
export default User;