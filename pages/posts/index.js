import { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/post-util";
import Head from "next/head";



export default function AllPostsPage(props) {
    return (
      <Fragment>
        <Head>
          <title>All My Posts</title>
          <meta name="description" content="Programming related tutorials and post" />
        </Head>
        <AllPosts posts={props.posts}/>
      </Fragment>
    )
}


export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    }
  }
}