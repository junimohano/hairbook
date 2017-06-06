import { Component, OnInit } from '@angular/core';
import { PostService } from './shared/post.service';

@Component({
  selector: 'hb-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts()
      .subscribe(result => {
        this.posts = result;
      }, error => alert(error));
  }

}
