import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import {Post} from './posts.model';

// ensures singleton of PostsService and prevents need to add to app.providers array
@Injectable({providedIn: 'root'})
export class PostsService {

    private posts: Post[] = [];
    private postsUpdated: Subject<Post[]> = new Subject<Post[]>();

    getPosts() {
        // [...foo] creates a shallow copy of the array foo
        return [...this.posts];
    }

    getPostsUpdateListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title:string, content:string) {
        const post:Post = {
            title: title,
            content:content
        };
        this.posts.push(post);
        this.postsUpdated.next(this.getPosts());
    }

}