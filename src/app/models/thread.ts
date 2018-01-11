import { Post } from '../models/post';

export class Thread {
    title: string;
    documentId?: string;
    threadId?: string;
    posts?: Array<Post>;
}