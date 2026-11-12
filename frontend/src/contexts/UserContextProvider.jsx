import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { apiRoutes, customAxios, UserTypes } from "@/constants.js";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export const userContext = createContext({
    user: null,
    setUser: () => {},
});

const tempUser = {
    displayName: "Admin",
    email: "Admin@admin.com",
    role: UserTypes.Admin,
};

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [requested, setRequested] = useState(false);

    const userQuery = useQuery({
        queryFn: async () => {
            try {
                const response = await customAxios.get(apiRoutes.getUser);
                // Strict validation: must be a valid JSON object with role and email
                if (
                    response.data &&
                    typeof response.data === "object" &&
                    typeof response.data.role === "number" &&
                    response.data.email
                ) {
                    return response.data;
                }
                return null;
            } catch (err) {
                return null;
            }
        },
        queryKey: ["user"],
        retry: false,
    });

    const { data, isError, isSuccess } = userQuery;
    useEffect(() => {
        if (isError) {
            setUser(null);
            setRequested(true);
        } else if (isSuccess) {
            setUser(data || null);
            setRequested(true);
        }
    }, [isError, isSuccess, data]);

    return (
        <userContext.Provider value={{ user, setUser, requested }}>
            {children}
        </userContext.Provider>
    );
};

export const useUser = () => useContext(userContext);
