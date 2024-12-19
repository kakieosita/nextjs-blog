import { Fragment } from "react";
import Hero from "../components/home-page/hero";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/post-util";
import Head from "next/head";



export default function HomePage(props){
    return(
        <Fragment>
          <Head>
            <title>Bonavnture Blog</title>
            <meta name="description" content="I post about programming" />
          </Head>
            <Hero/>
            <FeaturedPosts posts={props.posts}/>
        </Fragment>
    )
}

export function getStaticProps(){
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts
    }

  }
}