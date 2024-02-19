import { createContext, useContext } from "react";


export const InputValueContext = createContext({
    value: "",
    reverseVal: (val: any) => {},
})

export const InputValueProvider = InputValueContext.Provider

export default function  useInputValue() {
    return useContext(InputValueContext);
}