import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(request: Request){
    try{
        const { userId } = auth();
        if(!userId){
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const body = await request.json();
        const {name} = body;

        if(!name){
            return new NextResponse('Name is Required', { status: 400 });
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        });
        return NextResponse.json(store);
    }catch(err){
    console.log( '[STORE_POST]' ,err);
    return new NextResponse('Internal Server Error', { status: 500 });
    }
}