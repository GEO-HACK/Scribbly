import { NextResponse } from "next/server"
import  prisma from "../../../utils/connect"

export const  GET = async () => {


    try{

        const categories = await prisma.category.findMany()

        if (categories.length === 0){
            return new NextResponse(JSON.stringify({error:"no categories found"}),{status:404})
        }
        return new NextResponse(JSON.stringify(categories),{status:200})

    }catch(error){
        console.log(error)
        return new NextResponse(JSON.stringify({error:"something went wrong !"}),{status:500})
    }
}