import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../../schemas/changePasswordSchema.js";
import { changePassword } from "../../services/authAPI.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.js";
const ChangePassword = () => {

    const navigate=useNavigate();
    const logout =useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit=async(data)=>{
    try{
        await changePassword({
            oldPassword:data.oldPassword,
            newPassword:data.newPassword,
        })
        toast.success("Password changed successfully. Please log in again.")
        logout();

        setTimeout(()=>{
            navigate("/login")
        },15000)
    }catch(error){
        error?.message?.data?.message || "Failed to change password";
        toast.error(message)
    }
  }
    return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Change Password</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Old Password */}
        <div>
          <label className="block text-sm font-medium">Old Password</label>
          <input
            type="password"
            {...register("oldPassword")}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.oldPassword && (
            <p className="text-red-500 text-sm">{errors.oldPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label className="block text-sm font-medium">New Password</label>
          <input
            type="password"
            {...register("newPassword")}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm">{errors.newPassword.message}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-sm font-medium">Confirm New Password</label>
          <input
            type="password"
            {...register("confirmNewPassword")}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.confirmNewPassword && (
            <p className="text-red-500 text-sm">{errors.confirmNewPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSubmitting ? "Changing..." : "Change Password"}
        </button>
      </form>
    </div>
  );

};

export default ChangePassword;
