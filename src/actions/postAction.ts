"use server"
import prisma from "@/lib/prisma";


import { Post } from '@prisma/client';

export interface PostData {
  UserBeforeImage: string;
  UserAfterImage: string;
  Description: string;
  UserID?: string;
}

export const postAction = async (
  UserBeforeImage: string,
  UserAfterImage: string,
  Description: string,
  UserID = 'user12' // Provide default value instead of hardcoding
): Promise<Post> => {
  try {
    const result = await prisma.post.create({
      data: {
        UserBeforeImage,
        UserAfterImage,
        Description,
        UserID
      }
    });
    return result;
  } catch (error) {
    console.error('Error creating post:', error);
    throw new Error('Failed to create post');
  }
};

export const getPost = async (): Promise<Post[]> => {
    try {
        const result = await prisma.post.findMany({
          orderBy:{
            createdAt:"desc"
          }
        })
        return result
    } catch (error) {
        console.log(error)
        throw Error
    }
}

