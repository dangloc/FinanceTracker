import React, {useContext} from "react";
import { authContext } from "@/lib/store/auth-context";
import Image from 'next/image';
import bgSingIn from '@/public/bg-singin.svg';
import { FcGoogle } from 'react-icons/fc';

function SingIn() {

    const { googleLoginHandler } = useContext(authContext);

    return (
        <main className="container max-w-2xl px-6 mx-auto">
            <div className="flex overflow-hidden shadow-md shadow-slate-500 bg-full-page rounded-2xl">
                <div className="h-40 lg:h-[30rem] w-full">
                    <Image className="w-full h-full object-cover"
                        priority
                        src={bgSingIn}
                        alt="expense management"
                    />
                </div>

            </div>
            <div className="flex my-3 items-center flex-col">
                <h3 className="text-2xl text-center my-2">Đăng nhập để quản lí tài chính của bạn.</h3>
                <div className="my-2">
                    <button onClick={ googleLoginHandler } className="flex self-start gap-2 py-3 px-4 items-center bg-white rounded-md"> <FcGoogle className="text-2xl" /> Google</button>
                </div>
            </div>

        </main>
    )
}

export default SingIn;