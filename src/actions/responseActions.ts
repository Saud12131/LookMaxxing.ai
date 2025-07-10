"use server"
import prisma from "@/lib/prisma";

export const GetResultByID = async (id: number) => {
    try {
        const result = await prisma.result.findUnique({
            where: { id },
        });
        return result;
    } catch (err) {
        console.log(err)
        throw Error
    }

}   