import React, { Children, createContext, useContext, useState} from "react";

type UserContextType = {
    userName: string | null;
    setUserName: (name: string | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode}) => {
    const [userName, setUserName] = useState<string | null>(null);

    return(
        <UserContext.Provider value={{userName, setUserName}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context) throw new Error("useUser must be used within a UserProvider");
    return context;

}

