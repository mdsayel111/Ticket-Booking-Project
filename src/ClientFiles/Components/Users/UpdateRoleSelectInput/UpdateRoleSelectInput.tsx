"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import useAxiosSecure from "@/ClientFiles/Hooks/useAxiosSecure";
import { useAppSelector } from "@/ClientFiles/Hooks/ReduxHook";
import { user } from "@/ClientFiles/Types/CommonTypes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UpdateRoleSelectInput = ({ user }: { user: user }) => {
  const [role, setRole] = React.useState("");
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useAppSelector((state) => state.user);

  // handle use role change
  const handleChange = async (event: SelectChangeEvent) => {
    const value = event.target.value;
    const { data } = await axiosSecure.patch(
      `/api/v1/admin_apis/update_role?email=${userInfo.email}&id=${user._id}`,
      { role: value }
    );
    toast.success(data.message);
    setRole(event.target.value);
    location.reload();
  };

  return (
    <div className="w-fit ml-auto">
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={role}
            label="Role"
            onChange={handleChange}
          >
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"host"}>Host</MenuItem>
            {/* <MenuItem value={30}>Thirty</MenuItem> */}
          </Select>
        </FormControl>
      </Box>
    </div>
  );
};

export default UpdateRoleSelectInput;
