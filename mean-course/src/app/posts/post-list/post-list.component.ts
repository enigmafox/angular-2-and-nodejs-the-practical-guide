import {
    Component,
    OnInit,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']

})
export class PostListComponent implements OnInit, OnDestroy {

    // posts=[
    //     {title:'First', content: '1'},
    //     {title:'Second', content: '2'},
    //     {title:'Third', content: '3'}
    // ];

    posts: Post[] = [];
    private postsSub :Subscription;

    // 'public' on the postsService variable will create a new
    // public variable called 'postsService' that will
    // be populated with the value of the postsService parameter
    constructor(public postsService: PostsService) {}

    // Called when adding component to DOM
    ngOnInit() {
        this.posts = this.postsService.getPosts();
        // listens to changes to the posts array
        this.postsSub = this.postsService.getPostsUpdateListener().subscribe(
            // executes when a new value is omitted
            (posts:Post[]) => {
                this.posts = posts;
            }
        );
    }

    // Called when removing component from DOM
    ngOnDestroy() {
        this.postsSub.unsubscribe(); // prevents memory leak
    }

}