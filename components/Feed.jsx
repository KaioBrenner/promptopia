"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

// const PromptCardList = ({ data, handleTagClick }) => {
//   return (
//   );
// };

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const filteredPosts = posts.filter(
    (post) =>
      post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
      post.tag.toLowerCase().includes(searchText.toLowerCase()) ||
      post.creator.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    console.log(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center" action="">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* <PromptCardList data={posts} handleTagClick={() => { }} /> */}

      <div className="mt-16 prompt_layout">
        {searchText
          ? filteredPosts.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              ></PromptCard>
            ))
          : posts.map((post) => (
              <PromptCard
                key={post._id}
                post={post}
                handleTagClick={handleTagClick}
              ></PromptCard>
            ))}
      </div>
    </section>
  );
};

export default Feed;
