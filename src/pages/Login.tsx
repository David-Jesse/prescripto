import {useState} from "react";


const Login = () => {

    const [state, setState] = useState('Sign Up')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const onSubmit = async (e: any) => {
        e.preventDefault();
    }

    return (
        <form
            action={onSubmit}
            className={'min-h-[80vh] flex justify-center items-center'}
        >
            <div
                className={'flex flex-col gap-3 items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-zinc-600 text-sm shadow-lg'}>
                <p className={'text-2xl font-semibold'}>{state === 'Sign Up' ? 'Create Account' : "Login"}</p>
                <p>Please {state === 'Sign Up' ? 'sign up' : 'login'} to book an appointment </p>
                {
                    state === 'Sign Up' && <div className={'w-full'}>
                        <p>Full Name</p>
                        <input className={'border border-zinc-300 outline-none rounded focus:outline-[#5f6fff] w-full p-2 mt-1'} type="text"
                               onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter your Full Name"
                               required/>
                    </div>
                }

                <div className={'w-full'}>
                    <p>Email</p>
                    <input className={'border border-zinc-300 outline-none focus:outline-[#5f6fff] rounded w-full p-2 mt-1'} type="email"
                           onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter your email"
                           required/>
                </div>
                <div className={'w-full'}>
                    <p>Password</p>
                    <input className={'border border-zinc-300 rounded outline-none focus:border-[#5f6fff] w-full p-2 mt-1'} type="password"
                           onChange={(e) => setPassword(e.target.value)} value={password}
                           placeholder="Enter your password" required/>
                </div>

                <button
                    className={'bg-[#5f6fff] text-white py-2 w-full cursor-pointer rounded-md text-base hover:shadow-lg transform hover:scale-[1.02] transition-all'}>{state === 'Sign Up' ? 'Create Account' : 'Sign In'}</button>
                {
                    state === 'Sign Up' ?
                        <p>Already have an account? <span onClick={() => setState('Login')}
                                                          className={'text-[#5f6fff] underline cursor-pointer hover:text-[#4f5fef] transition-colors duration-300'}>Login here</span>
                        </p>
                        : <p>Create a new account? <span onClick={() => setState('Sign Up')}
                                                         className={'text-[#5f6fff] underline cursor-pointer'}>click here</span>
                        </p>
                }
            </div>

        </form>
    )
}

export default Login;