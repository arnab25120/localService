import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas/loginSchema.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authAPI.js";
import useAuthStore from "../../store/useAuthStore.js";

const Login=()=>{
  const navigate=useNavigate();
  const {setUser}=useAuthStore();

  const{
    register,
    handleSubmit,
    formState:{errors,isSubmitting},
  }=useForm({
    resolver:zodResolver(loginSchema),
    defaultValues:{
      email:"",
      password:"",
    },
  });

  const onSubmit=async(data)=>{
    try{
      const res=await loginUser(data);
      const user=res?.data?.data?.user;
      setUser(user);

      toast.success("Login successful");

      if(user.isAdmin){
        navigate("/")
      } else if(user.role==="provider"){
        navigate("/");
      }else{
        navigate("/")
      }
    } catch(err){
      const message=err?.response?.data?.message || "Login failed.Try again";
      toast.error(message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
         <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
       {/*  Email */}
       <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
        <input type="email"
        {...register("email")}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
       </div>
      {/*  Password */}
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
        <input type="
        password"
        {...register("password")}
        className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

     {/*  Submit Button */}
     <button
     type="submit"
     disabled={isSubmitting}
     className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
     >
      {isSubmitting?"Logging In":"Login"}
     </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
