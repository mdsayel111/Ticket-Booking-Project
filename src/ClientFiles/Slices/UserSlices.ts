import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface userState {
    _id: string,
    name: string,
    email: string,
    role: string,
}

// Define the initial state using that type
const initialState: { userInfo: userState } = { userInfo: {} as userState }

export const counterSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUser: (state, action: {
            payload: any;
            type: string;
        }) => {
            state.userInfo = action.payload
            console.log(state)
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload
        // },
    },
})

export const { setUser } = counterSlice.actions

export default counterSlice.reducer